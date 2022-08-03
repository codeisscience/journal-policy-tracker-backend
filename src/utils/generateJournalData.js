import { faker } from "@faker-js/faker";
import { Journal } from "../models/Journal";

const generateMockJournals = (userId) => {
  return {
    title: faker.animal.cat(),
    url: faker.internet.url(),
    issn: faker.datatype.number({ min: 10000000, max: 99999999 }),
    domainName: faker.internet.domainName(),
    policies: {
      title: faker.animal.cat(),
      firstYear: faker.datatype.number({ min: 2000, max: 2010 }),
      lastYear: faker.datatype.number({ min: 2011, max: 2022 }),
      policyType: faker.fake("Number One"),
      isDataAvailabilityStatementPublished: faker.datatype.boolean(),
      isDataShared: faker.datatype.boolean(),
      isDataPeerReviewed: faker.datatype.boolean(),
      enforced: faker.fake("No - Not Enforced"),
      enforcedEvidence: faker.lorem.sentence(10),
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    createdBy: faker.fake(userId),
  };
};

const generateMockJournalsArray = (numberOfJournals, userId) => {
  const mockJournals = [];
  for (let i = 0; i < numberOfJournals; i++) {
    const mockJournal = new Journal(generateMockJournals(userId));

    mockJournals.push(mockJournal);
  }
  return mockJournals;
};

export default generateMockJournalsArray;
