import { gql } from "apollo-server-express";

const REGISTER = gql`
  mutation Register($userInfo: RegisterInput!) {
    register(userInfo: $userInfo) {
      user {
        email
        fullName
        username
      }
      errors {
        field
        message
      }
    }
  }
`;

export default REGISTER;
