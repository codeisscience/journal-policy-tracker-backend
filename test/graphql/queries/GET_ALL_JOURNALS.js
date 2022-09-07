import { gql } from "apollo-server-express";

const GET_ALL_JOURNALS = gql`
  query GetAllJournals($currentPageNumber: Int!, $limitValue: Int!) {
    getAllJournals(
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
      }
      totalJournals
    }
  }
`;
export default GET_ALL_JOURNALS;
