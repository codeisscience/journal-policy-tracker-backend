import { User } from "../src/models/User";
import { createTestConnection } from "./createTestConnection";
import REGISTER from "./graphql/mutations/REGISTER";
import LOGIN from "./graphql/mutations/LOGIN";
import CREATE_JOURNAL from "./graphql/mutations/CREATE_JOURNAL";
import DELETE_JOURNAL from "./graphql/mutations/DELETE_JOURNAL";
import GET_CURRENT_USER from "./graphql/queries/GET_CURRENT_USER";
import UPDATE_JOURNAL from "./graphql/mutations/UPDATE_JOURNAL";
import { testingServer } from "./testingServer";
import GET_ALL_JOURNALS from "./graphql/queries/GET_ALL_JOURNALS";
import {
  testJournal1,
  testJournal2,
  testJournal3,
  testJournal4,
  journalsArray,
  updatedJournal,
} from "./journalsData";
import GET_JOURNAL_BY_ISSN from "./graphql/queries/GET_JOURNAL_BY_ISSN";
import GET_ALL_JOURNALS_BY_USER_ID from "./graphql/queries/GET_ALL_JOURNALS_BY_USER_ID";
import GET_ALL_JOURNALS_BY_CURRENT_USER from "./graphql/queries/GET_ALL_JOURNALS_BY_CURRENT_USER";
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

  let dbUser;

  it("Registering a new user (register Mutation)", async () => {
    const registerResponse = await testingServer.executeOperation({
      query: REGISTER,
      variables: {
        userInfo: testUser,
      },
    });

    expect(registerResponse.data).toBeDefined();
    expect(registerResponse.errors).toBeUndefined();
    expect(registerResponse.data.register.errors).toBeNull();
    expect(registerResponse.data.register.user).toEqual(expectedTestUser);
  });

  it("Logging in new user (login Mutation)", async () => {
    dbUser = await User.findOne({ email: testUser.email });

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

    expect(loginResponse.data).toBeDefined();
    expect(loginResponse.data.errors).toBeUndefined();
    expect(loginResponse.data.login.errors).toBeNull();
    expect(loginResponse.data.login).toEqual({
      user: {
        id: dbUser.id,
        username: dbUser.username,
        fullName: dbUser.fullName,
        email: dbUser.email,
      },
      errors: null,
    });
  });

  it("Fetching our own details as testUser (getCurrentUser Query)", async () => {
    const getCurrentUserResponse = await testingServer.executeOperation({
      query: GET_CURRENT_USER,
    });

    expect(getCurrentUserResponse.data).toBeDefined();
    expect(getCurrentUserResponse.data.errors).toBeUndefined();
    expect(getCurrentUserResponse.data.getCurrentUser).toMatchObject({
      id: dbUser.id,
      fullName: dbUser.fullName,
      email: dbUser.email,
      role: dbUser.role,
      username: dbUser.username,
    });
  });

  it("Create a new journals with that new user (createJournal Mutation)", async () => {
    const createJournalResponse = await testingServer.executeOperation({
      query: CREATE_JOURNAL,
      variables: testJournal1,
    });

    expect(createJournalResponse.data).toBeDefined();
    expect(createJournalResponse.errors).toBeUndefined();
    expect(createJournalResponse.data.createJournal).toMatchObject(
      testJournal1
    );

    expect(createJournalResponse.data.createJournal.journal.createdBy).toEqual(
      dbUser.id
    );
  });

  it("Fetching all journals (getAllJournals Query)", async () => {
    // Add 3 more journals
    await testingServer.executeOperation({
      query: CREATE_JOURNAL,
      variables: testJournal2,
    });

    await testingServer.executeOperation({
      query: CREATE_JOURNAL,
      variables: testJournal3,
    });

    await testingServer.executeOperation({
      query: CREATE_JOURNAL,
      variables: testJournal4,
    });

    const getAllJournalsResponse = await testingServer.executeOperation({
      query: GET_ALL_JOURNALS,
      variables: {
        currentPageNumber: 1,
        limitValue: 10,
      },
    });

    expect(getAllJournalsResponse.data).toBeDefined();
    expect(getAllJournalsResponse.errors).toBeUndefined();

    // Testing the response journals array
    expect(getAllJournalsResponse.data.getAllJournals.journals).toEqual(
      journalsArray
    );

    // Testing the response pagination info
    expect(getAllJournalsResponse.data.getAllJournals.totalJournals).toBe(4);
  });

  it("Fetching journal by ISSN (getJournalByISSN Query)", async () => {
    const getJournalByISSNResponse = await testingServer.executeOperation({
      query: GET_JOURNAL_BY_ISSN,
      variables: {
        issn: "11111111",
      },
    });
    expect(getJournalByISSNResponse.data).toBeDefined();
    expect(getJournalByISSNResponse.errors).toBeUndefined();
    expect(getJournalByISSNResponse.data.getJournalByISSN).toEqual(
      testJournal1.journal
    );
  });
});
