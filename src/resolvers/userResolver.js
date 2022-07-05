import { User } from "../models/User";
import validator from "validator";

const userResolver = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
  },
  Mutation: {
    register: async (_, { userInfo }) => {
      const { fullName, username, password, email } = userInfo;

      const user = new User({ fullName, username, password, email });

      try {
        await user.save();
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

      return { user };
    },

    login: async (_, { userInfo }) => {
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

      if (user.password != password) {
        return {
          errors: [
            {
              field: "password",
              message: "incorrect password",
            },
          ],
        };
      }
      return { user };
    },
  },
};

export default userResolver;
