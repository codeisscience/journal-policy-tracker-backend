import { User } from "../models/User";
import validator from "validator";
import bcrypt from "bcrypt";
import { COOKIE_NAME } from "../constants";

const saltRounds = 12;

const userResolver = {
  Query: {
    getCurrentUser: async (_, _args, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne({ _id: req.session.userId });
    },
    getAllUsers: async () => {
      return await User.find();
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
          createdAt: new Date(),
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
  },
};

export default userResolver;