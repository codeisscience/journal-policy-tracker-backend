import { User } from "../src/models/User";
import { createTestConnection } from "./createTestConnection";
import REGISTER from "./graphql/REGISTER";
import LOGIN from "./graphql/LOGIN";
import { testingServer } from "./testingServer";
import mongoose from "mongoose";

let conn;
beforeAll(async () => {
  conn = await createTestConnection();
  conn.connection.db.dropDatabase();
});

afterAll(async () => {
  await conn.connection.close();
});

describe("resolvers", () => {
  jest.setTimeout(40000);
  it("register, login and getCurrentUser", async () => {
    const testUser = {
      username: "deva",
      email: "dev@dev.com",
      password: "myPa$$w0rd",
      fullName: "Devesh Kumar",
    };

    const expectedTestUser = {
      username: "deva",
      email: "dev@dev.com",
      fullName: "Devesh Kumar",
    };

    const registerResponse = await testingServer.executeOperation({
      query: REGISTER,
      variables: {
        userInfo: testUser,
      },
    });

    const dbUser = await User.findOne({ email: testUser.email });

    expect(dbUser).toBeDefined();

    const loginResponse = await testingServer.executeOperation({
      query: LOGIN,
      variables: {
        userInfo: {
          usernameOrEmail: testUser.username,
          password: testUser.password,
        },
      },
    });

    console.log({ loginResponse: loginResponse.data.login });

    expect(loginResponse.data.login).toEqual({
      user: {
        id: dbUser.id,
        username: dbUser.username,
        fullName: dbUser.fullName,
        email: dbUser.email,
      },
      errors: null,
    });

    // console.log({ dbUser });

    // console.log({ registerResponse: registerResponse.data.register.user });
    // console.log({
    //   registerResponseError: registerResponse.data.register.errors,
    // });

    expect(registerResponse.data.register.user).toBeDefined();
    expect(registerResponse.data.register.user).toEqual(expectedTestUser);
    expect(registerResponse.data.register.errors).toBeNull();
  });
});
