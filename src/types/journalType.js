import { gql } from "apollo-server-express";

const journalType = gql`
  type Journal {
    id: ID
    title: String!
    url: String!
    issn: Int!
    domain: String!
  }
  input JournalInput {
    title: String!
    url: String!
    issn: Int!
    domain: String!
  }
  type Query {
    getAllJournals: [Journal]!
  }
  type Mutation {
    createJournal(journal: JournalInput!): Journal!
  }
`;

export default journalType;
