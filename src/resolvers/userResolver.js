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
  forgotPasswordEmail,
  verifyNewEmailAddressEmail,
} from "../utils/emailForms";
import generateMockUsersArray from "../utils/generateUserData";
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
      try {
        if (!req.session.userId) {
          return null;
        }

        return await User.findById(req.session.userId);
      } catch (error) {
        return error;
      }
    },

    getUserById: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (error) {
        return error;
      }
    },

    getAllUsers: async (_, { currentPageNumber, limitValue }) => {
      try {
        const skipValue = (currentPageNumber - 1) * limitValue;
        const totalUsers = User.count();
        const users = await User.find().limit(limitValue).skip(skipValue);
        return {
          users,
          totalUsers,
        };
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    register: async (_, { userInfo }, { req }) => {
      try {
        const { fullName, username, password, email } = userInfo;

        let user;
        let trimmedFullName = fullName.trim();

        if (!validator.isLength(trimmedFullName, { min: 3, max: 50 })) {
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

        if (
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          })
        ) {
          return {
            errors: [
              {
                field: "password",
                message:
                  "password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol",
              },
            ],
          };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
          fullName: trimmedFullName,
          username,
          email,
          password: hashedPassword,
          isEmailVerified: false,
        });

        const insertedUser = await user.save();

        req.session.userId = user.id;
        return { user };
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
          return error;
        }
      }
    },

    login: async (_, { userInfo }, { req }) => {
      try {
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
      } catch (error) {
        return error;
      }
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

        return { user: currentUser };
      } catch (error) {
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

        return true;
      } catch (error) {
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

        return true;
      } catch (error) {
        return error;
      }
    },

    logout: (_, __, { req, res }) => {
      try {
        return new Promise((resolve) =>
          req.session.destroy((err) => {
            res.clearCookie(COOKIE_NAME, {
              // Cookie options should be changed or removed before we go in prod
              sameSite: "none",
              secure: true,
            });
            if (err) {
              resolve(false);
              return;
            }

            resolve(true);
          })
        );
      } catch (error) {
        return error;
      }
    },

    addMockUserData: async (_, { numberOfUsers }) => {
      try {
        const generatedUsers = generateMockUsersArray(numberOfUsers);
        await User.insertMany(generatedUsers);
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};

export default userResolver;
