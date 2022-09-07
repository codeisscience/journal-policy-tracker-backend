import { gql } from "apollo-server-express";

const GET_JOURNAL_BY_ISSN = gql`
  query GetJournalByISSN($issn: String!) {
    getJournalByISSN(issn: $issn) {
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
  }
`;
export default GET_JOURNAL_BY_ISSN;
