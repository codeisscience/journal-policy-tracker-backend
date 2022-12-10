import bcrypt from "bcrypt";
import { v4 } from "uuid";
import validator from "validator";
import {
  CENTER_IMAGE_URL,
  CODE_IS_SCIENCE_URL,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
  LOGO_URL,
} from "../constants";
import { User } from "../models/User";
import emailTemplate from "../utils/emailTemplate";
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

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
          fullName,
          username,
          email,
          password: hashedPassword,
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
          1000 * 60 * 60 * 24 * 3
        );

        const emailResult = await sendEmail(
          email,
          "Forgot Password",
          emailTemplate(
            `${process.env.CORS_ORIGIN}/change-password/${token}`,
            FORGOT_PASSWORD_EMAIL_TITLE,
            LOGO_URL,
            CODE_IS_SCIENCE_URL,
            FORGOT_PASSWORD_IMAGE_URL,
            FORGOT_PASSWORD_IMAGE_URL_ALT,
            FORGOT_PASSWORD_TITLE_ONE,
            FORGOT_PASSWORD_TITLE_TWO,
            FORGOT_PASSWORD_SUBTITLE,
            FORGOT_PASSWORD_BUTTON_TEXT,
            FORGOT_PASSWORD_BUTTON_POINTER_TEXT
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
