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
    createJournal: async (_, { journalToCreate }) => {
      const journal = new Journal({ ...journalToCreate });
      await journal.save();
      return journal;
    },

    deleteJournal: async (_, { issnToDelete }) => {
      await Journal.deleteOne({ issn: issnToDelete });
      return "Journal Deleted";
    },

    updateJournal: async (_, { issnToUpdate, newJournalDetails }) => {
      const { _id } = await Journal.findOne({ issn: issnToUpdate });
      await Journal.updateOne({ _id }, { ...newJournalDetails });
      return await Journal.findOne({ _id });
    },
  },
};

export default journalResolver;
