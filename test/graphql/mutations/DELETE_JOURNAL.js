import { gql } from "apollo-server-express";

const DELETE_JOURNAL = gql`
  mutation DeleteJournal($issnToDelete: String!) {
    deleteJournal(issnToDelete: $issnToDelete)
  }
`;
export default DELETE_JOURNAL;
