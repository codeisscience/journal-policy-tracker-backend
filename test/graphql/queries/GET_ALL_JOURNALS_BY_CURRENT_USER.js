import { gql } from "apollo-server-express";

const GET_ALL_JOURNALS_BY_CURRENT_USER = gql`
  query GetAllJournalsByCurrentUser(
    $currentPageNumber: Int!
    $limitValue: Int!
  ) {
    getAllJournalsByCurrentUser(
      currentPageNumber: $currentPageNumber
      limitValue: $limitValue
    ) {
      journals {
        id
        title
        url
        issn
        domainName
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
        createdAt
        updatedAt
        createdBy
      }
      totalJournals
    }
  }
`;

export default GET_ALL_JOURNALS_BY_CURRENT_USER;
