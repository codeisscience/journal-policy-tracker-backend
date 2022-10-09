import { gql } from "apollo-server-express";

const CHANGE_FULLNAME = gql`
  mutation ChangeFullName($userInfo: ChangeFullnameInput!) {
    changeFullName(userInfo: $userInfo) {
      user {
        id
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

export default CHANGE_FULLNAME;
