import { gql } from "apollo-server-express";

const GET_ALL_JOURNALS_BY_USER_ID = gql`
  query GetAllJournalsByUserId(
    $userId: ID!
    $currentPageNumber: Int!
    $limitValue: Int!
  ) {
    getAllJournalsByUserId(
      userId: $userId
      currentPageNumber: $currentPageNumber
      limitValue: $limitValue
    ) {
      journals {
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
        createdBy
      }
      totalJournals
    }
  }
`;
export default GET_ALL_JOURNALS_BY_USER_ID;
