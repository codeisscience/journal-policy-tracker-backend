import bcrypt from "bcrypt";
import { v4 } from "uuid";
import validator from "validator";
import {
  ACCOUNT_VERIFICATION_PREFIX,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
  NEW_EMAIL_ADDRESS_PREFIX,
  VERIFY_NEW_EMAIL_ADDRESS_PREFIX,
} from "../constants";
import { User } from "../models/User";
import {
  accountVerificationEmail,
  emailAddressUpdateAlertEmail,
  forgotPasswordEmail,
  passwordUpdateAlertEmail,
  usernameUpdateAlertEmail,
  verifyNewEmailAddressEmail,
} from "../utils/emailForms";
import generateMockUsersArray from "../utils/generateUserData";
import { getCurrentDateAndTime } from "../utils/getCurrentDateAndTime";
import { sendEmail } from "../utils/sendEmail";

const saltRounds = 12;

const userResolver = {
  Role: {
    ADMIN: "ADMIN",
    MODERATOR: "MODERATOR",
    USER: "USER",
  },

  Query: {
    getCurrentUser: async (_, _args, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return await User.findById(req.session.userId);
    },

    getUserById: async (_, { userId }) => {
      return await User.findById(userId);
    },

    getAllUsers: async (_, { currentPageNumber, limitValue }) => {
      const skipValue = (currentPageNumber - 1) * limitValue;
      const totalUsers = User.count();
      const users = await User.find().limit(limitValue).skip(skipValue);
      return {
        users,
        totalUsers,
      };
    },
  },

  Mutation: {
    register: async (_, { userInfo }, { req }) => {
      const { fullName, username, password, email } = userInfo;

      let user;

      if (!validator.isLength(fullName, { min: 3, max: 50 })) {
        return {
          errors: [
            {
              field: "fullName",
              message: "full name must be between 3 and 50 characters long",
            },
          ],
        };
      }

      if (!validator.isAlphanumeric(username, "en-US", { ignore: "_-" })) {
        return {
          errors: [
            {
              field: "username",
              message:
                "username can only contain letters, numbers, underscores (_) and dashes (-)",
            },
          ],
        };
      }

      if (!validator.isEmail(email)) {
        return {
          errors: [
            {
              field: "email",
              message: "invalid email address",
            },
          ],
        };
      }

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
          fullName,
          username,
          email,
          password: hashedPassword,
          isEmailVerified: false,
        });

        const insertedUser = await user.save();
      } catch (error) {
        if (
          error.code === 11000 &&
          Object.keys(error.keyValue)[0] === "username"
        ) {
          return {
            errors: [{ field: "username", message: "username already exists" }],
          };
        } else if (
          error.code === 11000 &&
          Object.keys(error.keyValue)[0] === "email"
        ) {
          return {
            errors: [{ field: "email", message: "email already taken" }],
          };
        } else {
          console.log({ registerError: error });
          return error;
        }
      }

      req.session.userId = user.id;
      return { user };
    },

    login: async (_, { userInfo }, { req }) => {
      const { usernameOrEmail, password } = userInfo;

      let user;
      if (!validator.isEmail(usernameOrEmail)) {
        user = await User.findOne({ username: usernameOrEmail });
      } else {
        user = await User.findOne({ email: usernameOrEmail });
      }

      if (!user) {
        return {
          errors: [
            {
              field: "usernameOrEmail",
              message: "that username or email does not exist",
            },
          ],
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          errors: [
            {
              field: "password",
              message: "incorrect password",
            },
          ],
        };
      }

      req.session.userId = user.id;
      return { user };
    },

    sendNewEmailAddressVerificationEmail: async (
      _,
      { newEmailAddress, password },
      { redis, req }
    ) => {
      try {
        const currentUser = await User.findById(req.session.userId);

        // check if email address is valid
        if (!validator.isEmail(newEmailAddress)) {
          return {
            errors: [
              {
                field: "newEmailAddress",
                message: "invalid email address",
              },
            ],
          };
        }

        // check if the new email address is the same as the old one
        if (newEmailAddress === currentUser.email) {
          return {
            errors: [
              {
                field: "newEmailAddress",
                message: "new email address cannot be the same as the old one",
              },
            ],
          };
        }

        // check if the new email address is already taken
        const isEmailTaken = await User.findOne({ email: newEmailAddress });
        if (isEmailTaken) {
          return {
            errors: [
              {
                field: "newEmailAddress",
                message: "email address already taken",
              },
            ],
          };
        }

        // verify password
        const isOldPasswordCorrect = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!isOldPasswordCorrect) {
          return {
            errors: [
              {
                field: "password",
                message: "old password does not match",
              },
            ],
          };
        }

        const token = v4();
        await redis.set(
          VERIFY_NEW_EMAIL_ADDRESS_PREFIX + token,
          currentUser.id,
          "ex",
          1000 * 60 * 60 * 24 * 1 // 1 day
        );

        await redis.set(
          NEW_EMAIL_ADDRESS_PREFIX + token,
          newEmailAddress,
          "ex",
          1000 * 60 * 60 * 24 * 1 // 1 day
        );

        // send verification email to new email address
        const emailResult = await sendEmail(
          newEmailAddress,
          "Confirm New Email Address",
          verifyNewEmailAddressEmail(
            `${process.env.CORS_ORIGIN}/new-email-verification/${token}`
          )
        );

        console.log({ emailResult });

        return { user: currentUser };
      } catch (error) {
        console.log({ changeEmailAddressError: error });
        return error;
      }
    },

    changeEmailAddress: async (_, { token }, { redis }) => {
      try {
        const userId = await redis.get(VERIFY_NEW_EMAIL_ADDRESS_PREFIX + token);

        if (!userId) {
          return {
            errors: [
              {
                field: "token",
                message: "token expired",
              },
            ],
          };
        }

        const newEmailAddress = await redis.get(
          NEW_EMAIL_ADDRESS_PREFIX + token
        );

        const user = await User.findById(userId);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { email: newEmailAddress },
          { new: true }
        );

        await redis.del(VERIFY_NEW_EMAIL_ADDRESS_PREFIX + token);
        await redis.del(NEW_EMAIL_ADDRESS_PREFIX + token);

        // send alert email to old email address that the email address has been changed
        const emailResult = await sendEmail(
          user.email,
          "Email Address Changed",
          emailAddressUpdateAlertEmail(newEmailAddress, getCurrentDateAndTime())
        );

        console.log({ emailResult });

        return { user: updatedUser };
      } catch (error) {
        console.log({ changeEmailAddressError: error });
        return error;
      }
    },

    sendAccountVerificationEmail: async (_, __, { redis, req }) => {
      try {
        const currentUser = await User.findById(req.session.userId);

        const token = v4();
        await redis.set(
          ACCOUNT_VERIFICATION_PREFIX + token,
          currentUser.id,
          "ex",
          1000 * 60 * 60 * 24 * 1 // 1 day
        );

        const accountVerificationEmailResults = await sendEmail(
          currentUser.email,
          "Account Verification",
          accountVerificationEmail(
            `${process.env.CORS_ORIGIN}/account-verification/${token}`
          )
        );

        console.log({ accountVerificationEmailResults });

        return true;
      } catch (error) {
        console.log({ sendVerificationEmailError: error });
        return error;
      }
    },

    verifyUserAccount: async (_, { token }, { redis }) => {
      try {
        const key = ACCOUNT_VERIFICATION_PREFIX + token;
        const userId = await redis.get(key);

        if (!userId) {
          return {
            errors: [
              {
                field: "token",
                message: "token expired",
              },
            ],
          };
        }

        const user = await User.findById(userId);

        if (!user) {
          return {
            errors: [
              {
                field: "token",
                message: "user no longer exists",
              },
            ],
          };
        }

        await User.findByIdAndUpdate(userId, {
          isEmailVerified: true,
        });

        await redis.del(key);

        return { user };
      } catch (error) {
        console.log({ verifyUserAccountError: error });
        return error;
      }
    },

    forgotPassword: async (_, { email }, { redis }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return true;
        }

        const token = v4();
        await redis.set(
          FORGET_PASSWORD_PREFIX + token,
          user.id,
          "ex",
          1000 * 60 * 60 * 24 * 3 // 3 days
        );

        const emailResult = await sendEmail(
          email,
          "Forgot Password",
          forgotPasswordEmail(
            `${process.env.CORS_ORIGIN}/change-password/${token}`
          )
        );

        console.log({ emailResult });

        return true;
      } catch (error) {
        console.log(error);
      }
    },

    changeForgotPassword: async (_, { token, newPassword }, { redis, req }) => {
      try {
        if (newPassword.length <= 3) {
          return {
            errors: [
              {
                field: "newPassword",
                message: "length must be greater than 3",
              },
            ],
          };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
          return {
            errors: [
              {
                field: "token",
                message: "token expired",
              },
            ],
          };
        }

        const user = await User.findById(userId);

        if (!user) {
          return {
            errors: [
              {
                field: "token",
                message: "user no longer exists",
              },
            ],
          };
        }

        await User.findByIdAndUpdate(userId, {
          password: await bcrypt.hash(newPassword, saltRounds),
        });

        await redis.del(key);

        // This logs the user in after changing the password
        req.session.userId = user.id;

        return { user };
      } catch (error) {
        console.log(error);
      }
    },

    logout: (_, __, { req, res }) => {
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie(COOKIE_NAME, {
            // Cookie options should be changed or removed before we go in prod
            sameSite: "none",
            secure: true,
          });
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }

          resolve(true);
        })
      );
    },

    changePassword: async (_, { oldPassword, newPassword }, { req }) => {
      try {
        const { password } = await User.findById(req.session.userId);
        const isOldPasswordCorrect = await bcrypt.compare(
          oldPassword,
          password
        );

        if (!isOldPasswordCorrect) {
          return {
            errors: [
              {
                field: "password",
                message: "old password does not match",
              },
            ],
          };
        }

        if (newPassword.length <= 3) {
          return {
            errors: [
              {
                field: "newPassword",
                message: "length must be greater than 3",
              },
            ],
          };
        }

        const currentUser = await User.findByIdAndUpdate(req.session.userId, {
          password: await bcrypt.hash(newPassword, saltRounds),
        });

        const emailResult = await sendEmail(
          currentUser.email,
          "Password Updated",
          passwordUpdateAlertEmail(getCurrentDateAndTime())
        );

        console.log({ emailResult });
      } catch (error) {
        console.log(error);
      }

      let updatedUser = await User.findById(req.session.userId);
      return { user: updatedUser };
    },

    changeFullName: async (_, { newFullName }, { req }) => {
      const { fullName } = await User.findById(req.session.userId);

      if (!validator.isLength(newFullName, { min: 3, max: 50 })) {
        return {
          errors: [
            {
              field: "fullName",
              message: "full name must be between 3 and 50 characters long",
            },
          ],
        };
      }

      if (newFullName === fullName) {
        return {
          errors: [
            {
              field: "fullName",
              message: "old and new full name are same",
            },
          ],
        };
      }

      try {
        await User.findByIdAndUpdate(req.session.userId, {
          fullName: newFullName,
        });
      } catch (error) {
        console.log(error);
      }

      let updatedUser = await User.findById(req.session.userId);
      return { user: updatedUser };
    },

    changeUsername: async (_, { newUsername }, { req }) => {
      try {
        const { username } = await User.findById(req.session.userId);

        if (!validator.isAlphanumeric(newUsername, "en-US", { ignore: "_-" })) {
          return {
            errors: [
              {
                field: "username",
                message:
                  "username can only contain letters, numbers, underscores (_) and dashes (-)",
              },
            ],
          };
        }

        if (username === newUsername) {
          return {
            errors: [
              {
                field: "username",
                message: "old and new username are same",
              },
            ],
          };
        }

        const updatedUser = await User.findByIdAndUpdate(req.session.userId, {
          username: newUsername,
        });

        const emailResult = await sendEmail(
          updatedUser.email,
          "Username Changed",
          usernameUpdateAlertEmail(newUsername, getCurrentDateAndTime())
        );

        console.log({ emailResult });
      } catch (error) {
        if (
          error.code === 11000 &&
          Object.keys(error.keyValue)[0] === "username"
        ) {
          return {
            errors: [
              {
                field: "username",
                message: "username already exists",
              },
            ],
          };
        }
      }

      let updatedUser = await User.findById(req.session.userId);
      return { user: updatedUser };
    },

    addMockUserData: async (_, { numberOfUsers }) => {
      try {
        const generatedUsers = generateMockUsersArray(numberOfUsers);
        await User.insertMany(generatedUsers);
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },
  },
};

export default userResolver;
