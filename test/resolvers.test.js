import { User } from "../src/models/User";
import { createTestConnection } from "./createTestConnection";
import REGISTER from "./graphql/mutations/REGISTER";
import LOGIN from "./graphql/mutations/LOGIN";
import GET_CURRENT_USER from "./graphql/queries/GET_CURRENT_USER";
import { testingServer } from "./testingServer";
const util = require("util");

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

  const testUser = {
    username: "dev",
    email: "dev@dev.com",
    password: "myPa$$w0rd",
    fullName: "Devesh Kumar",
  };

  const expectedTestUser = {
    username: "dev",
    email: "dev@dev.com",
    fullName: "Devesh Kumar",
  };

  it("register mutation", async () => {
    const registerResponse = await testingServer.executeOperation({
      query: REGISTER,
      variables: {
        userInfo: testUser,
      },
    });

    expect(registerResponse.data.register.user).toBeDefined();
    expect(registerResponse.data.register.user).toEqual(expectedTestUser);
    expect(registerResponse.data.register.errors).toBeNull();
  });

  it("login and getCurrentUser", async () => {
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

    expect(loginResponse.data.login).toEqual({
      user: {
        id: dbUser.id,
        username: dbUser.username,
        fullName: dbUser.fullName,
        email: dbUser.email,
      },
      errors: null,
    });

    const getCurrentUserResponse = await testingServer.executeOperation({
      query: GET_CURRENT_USER,
    });

    expect(getCurrentUserResponse.data.getCurrentUser).toEqual({
      id: dbUser.id,
      fullName: dbUser.fullName,
      email: dbUser.email,
      role: dbUser.role,
      username: dbUser.username,
      createdAt: Math.floor(new Date(dbUser.createdAt).getTime()).toString(),
      updatedAt: Math.floor(new Date(dbUser.updatedAt).getTime()).toString(),
    });

    // console.log(
    //   util.inspect(getCurrentUserResponse, {
    //     showHidden: false,
    //     depth: 10,
    //     colors: true,
    //   })
    // );
  });
});
