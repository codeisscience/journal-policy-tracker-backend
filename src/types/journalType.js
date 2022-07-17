import { gql } from "apollo-server-express";

const journalType = gql`
  type Policies {
    title: String!
    firstYear: Int!
    lastYear: Int
    policyType: String!
  }

  input PoliciesInput {
    title: String!
    firstYear: Int!
    lastYear: Int
    policyType: String!
  }

  type Journal {
    id: ID
    title: String!
    url: String!
    issn: Int!
    domainName: String!
    policies: Policies!
    createdAt: String!
    updatedAt: String!
    createdBy: String!
  }

  input JournalInput {
    title: String!
    url: String!
    issn: Int!
    domainName: String!
    policies: PoliciesInput!
  }

  type JournalResponse {
    journal: Journal
    errors: [Error]
  }

  type Error {
    field: String!
    message: String!
  }

  type Query {
    getAllJournals: [Journal]
    getJournalByISSN(issn: Int): Journal
  }

  type Mutation {
    createJournal(journalToCreate: JournalInput!): JournalResponse!
    deleteJournal(issnToDelete: Int!): Boolean!
    updateJournal(
      issnToUpdate: Int!
      newJournalDetails: JournalInput!
    ): JournalResponse!
  }
`;

export default journalType;
