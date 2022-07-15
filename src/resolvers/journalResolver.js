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
      let journal;
      try {
        journal = new Journal({ ...journalToCreate });
        await journal.save();
      } catch (error) {
        if (error.code === 11000 && Object.keys(error.keyValue)[0] === "issn") {
          return {
            errors: [{ field: "issn", message: "issn already exists" }],
          };
        }
      }
      return { journal };
    },

    deleteJournal: async (_, { issnToDelete }) => {
      const { deletedCount } = await Journal.deleteOne({ issn: issnToDelete });

      if (deletedCount === 0) {
        return false;
      }

      return true;
    },

    updateJournal: async (_, { issnToUpdate, newJournalDetails }) => {
      const journalToUpdate = await Journal.findOne({ issn: issnToUpdate });

      if (!journalToUpdate) {
        return {
          errors: [{ field: "issn", message: "issn not available" }],
        };
      }

      const { _id } = journalToUpdate;
      try {
        await Journal.updateOne({ _id }, { ...newJournalDetails });
      } catch (error) {
        if (error.code === 11000 && Object.keys(error.keyValue)[0] === "issn") {
          return {
            errors: [{ field: "issn", message: "new issn already exists" }],
          };
        }
      }

      const updatedJournal = await Journal.findOne({ _id });
      return { journal: updatedJournal };
    },
  },
};

export default journalResolver;
