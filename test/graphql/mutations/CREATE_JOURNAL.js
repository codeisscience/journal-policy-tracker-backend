import { gql } from "apollo-server-express";

const CREATE_JOURNAL = gql`
  mutation CreateJournal($journal: JournalInput!) {
    createJournal(journalToCreate: $journal) {
      journal {
        id
        title
        url
        issn
        domainName
        createdAt
        updatedAt
        createdBy

        policies {
          title
          firstYear
          lastYear
          policyType
          isDataAvailabilityStatementPublished
          isDataShared
          isDataPeerReviewed
          enforced
          enforcedEvidence
        }
      }

      errors {
        field
        message
      }
    }
  }
`;

export default CREATE_JOURNAL;
