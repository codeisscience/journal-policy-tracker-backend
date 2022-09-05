import { User } from "../src/models/User";
import { createTestConnection } from "./createTestConnection";
import REGISTER from "./graphql/register";
import { testingServer } from "./testingServer";

let conn;
beforeAll(async () => {
  conn = await createTestConnection();
});

afterAll(async () => {
  await conn.close();
});

describe("resolvers", () => {
  jest.setTimeout(40000);
  it("register", async () => {
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

    expect(registerResponse.data.register.user).toBeDefined();
    expect(registerResponse.data.register.user).toEqual(expectedTestUser);
    expect(registerResponse.data.register.errors).toBeNull();
  });
});
