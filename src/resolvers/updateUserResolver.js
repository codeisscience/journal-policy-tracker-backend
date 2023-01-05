import bcrypt from "bcrypt";
import validator from "validator";
import {
  FORGET_PASSWORD_PREFIX,
  NEW_EMAIL_ADDRESS_PREFIX,
  VERIFY_NEW_EMAIL_ADDRESS_PREFIX,
} from "../constants";
import { User } from "../models/User";
import {
  emailAddressUpdateAlertEmail,
  passwordUpdateAlertEmail,
  usernameUpdateAlertEmail,
} from "../utils/emailForms";
import { getCurrentDateAndTime } from "../utils/getCurrentDateAndTime";
import { sendEmail } from "../utils/sendEmail";

const updateUserResolver = {
  Mutation: {
    updateFullName: async (_, { newFullName }, { req }) => {
      try {
        const { fullName } = await User.findById(req.session.userId);

        const trimmedNewFullName = newFullName.trim();

        if (!validator.isLength(trimmedNewFullName, { min: 3, max: 50 })) {
          return {
            errors: [
              {
                field: "fullName",
                message: "full name must be between 3 and 50 characters long",
              },
            ],
          };
        }

        if (trimmedNewFullName === fullName) {
          return {
            errors: [
              {
                field: "fullName",
                message: "old and new full name are same",
              },
            ],
          };
        }

        const updatedUser = await User.findByIdAndUpdate(
          req.session.userId,
          {
            fullName: trimmedNewFullName,
          },
          { new: true }
        );

        return { user: updatedUser };
      } catch (error) {
        return error;
      }
    },

    updateUsername: async (_, { newUsername }, { req }) => {
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

        const updatedUser = await User.findByIdAndUpdate(
          req.session.userId,
          { username: newUsername },
          { new: true }
        );

        const emailResult = await sendEmail(
          updatedUser.email,
          "Username Changed",
          usernameUpdateAlertEmail(newUsername, getCurrentDateAndTime())
        );

        return { user: updatedUser };
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
    },

    updateEmailAddress: async (_, { token }, { redis }) => {
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

        return { user: updatedUser };
      } catch (error) {
        return error;
      }
    },

    updateForgotPassword: async (_, { token, newPassword }, { redis, req }) => {
      try {
        if (
          !validator.isStrongPassword(newPassword, {
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
        return error;
      }
    },

    updatePassword: async (_, { oldPassword, newPassword }, { req }) => {
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

        if (
          !validator.isStrongPassword(newPassword, {
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

        const currentUser = await User.findByIdAndUpdate(
          req.session.userId,
          {
            password: await bcrypt.hash(newPassword, saltRounds),
          },
          { new: true }
        );

        const emailResult = await sendEmail(
          currentUser.email,
          "Password Updated",
          passwordUpdateAlertEmail(getCurrentDateAndTime())
        );

        return { user: updatedUser };
      } catch (error) {
        return error;
      }
    },
  },
};

export default updateUserResolver;
