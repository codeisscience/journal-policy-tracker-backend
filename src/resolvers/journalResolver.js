import { Journal } from "../models/Journal";

const journalResolver = {
  Query: {
    getAllJournals: async () => {
      return await Journal.find();
    },

    getJournalByISSN: async (_, { issn }) => {
      return await Journal.findOne({ issn });
    },
  },

  Mutation: {
    createJournal: async (_, args) => {
      const { title, url, issn, domainName, policies } = args.journal;
      const journal = new Journal({ title, url, issn, domainName, policies });
      await journal.save();
      return journal;
    },

    deleteJournal: async (_, { issnToDelete }) => {
      await Journal.deleteOne({ issn: issnToDelete });
      return "Journal Deleted";
    },

    updateJournal: async (_, { issnToUpdate, newJournalDetails }) => {
      const { title, url, domainName, issn, policies } = newJournalDetails;
      const { _id } = await Journal.findOne({ issn: issnToUpdate });
      await Journal.updateOne(
        { _id },
        { title, url, domainName, issn, policies }
      );
      return await Journal.findOne({ _id });
    },
  },
};

export default journalResolver;
