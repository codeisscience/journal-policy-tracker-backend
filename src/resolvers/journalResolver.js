import { Journal } from "../models/Journal";

const journalResolver = {
  Query: {
    getAllJournals: async () => {
      return await Journal.find();
    },
  },
  Mutation: {
    createJournal: async (_, args) => {
      const { title, url, issn, domain } = args.journal;
      const journal = new Journal({ title, url, issn, domain });
      await journal.save();
      return journal;
    },
  },
};

export default journalResolver;
