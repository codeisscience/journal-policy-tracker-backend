import { gql } from "apollo-server-express";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      fullName
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export default GET_CURRENT_USER;
