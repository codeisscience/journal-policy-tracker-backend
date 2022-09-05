import { gql } from "apollo-server-express";

const LOGIN = gql`
  mutation Login($userInfo: LoginInput!) {
    login(userInfo: $userInfo) {
      errors {
        field
        message
      }
      user {
        email
        fullName
        id
        username
      }
    }
  }
`;

export default LOGIN;
