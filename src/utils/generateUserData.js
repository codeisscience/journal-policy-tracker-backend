import { faker } from "@faker-js/faker";
import { User } from "../models/User";

const generateMockUser = () => {
  return {
    fullName: faker.fake("{{name.firstName}} {{name.lastName}}"),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
  };
};

const generateMockUsersArray = (numberOfUsers) => {
  const mockUsers = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const mockUser = new User(generateMockUser());

    mockUsers.push(mockUser);
  }
  return mockUsers;
};

export default generateMockUsersArray;
