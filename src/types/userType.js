import { gql } from "apollo-server-express";

const userType = gql`
  type User {
    id: ID
    fullName: String!
    username: String!
    email: String!
  }

  input RegisterInput {
    fullName: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  type UserResponse {
    user: User
    errors: [Error]
  }

  type Error {
    field: String!
    message: String!
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    register(userInfo: RegisterInput!): UserResponse!
    login(userInfo: LoginInput!): UserResponse!
  }
`;

export default userType;
