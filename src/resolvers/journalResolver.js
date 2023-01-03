import { Journal } from "../models/Journal";
import { User } from "../models/User";
import generateMockJournalsArray from "../utils/generateJournalData";

const journalResolver = {
  PolicyType: {
    NUMBER_ONE: "Number One",
    NUMBER_TWO: "Number Two",
    NUMBER_THREE: "Number Three",
    NUMBER_FOUR: "Number Four",
  },

  Enforced: {
    YES: "Yes - Before Publication",
    SOMETIMES: "Sometimes - Post-Publication Audit",
    NO: "No - Not Enforced",
  },

  Query: {
    getAllJournals: async (_, { currentPageNumber, limitValue }) => {
      try {
        const skipValue = (currentPageNumber - 1) * limitValue;
        const totalJournals = await Journal.count();
        const journals = await Journal.find()
          .sort({ createdAt: -1 })
          .limit(limitValue)
          .skip(skipValue);
        return { journals, totalJournals };
      } catch (error) {
        return error;
      }
    },

    getAllJournalsByCurrentUser: async (
      _,
      { currentPageNumber, limitValue },
      { req }
    ) => {
      try {
        const skipValue = (currentPageNumber - 1) * limitValue;

        const currentUser = await User.findById(req.session.userId);

        const numberOfJournalsByCurrentUser = currentUser.journals.length;

        const allJournalsByCurrentUser = await Journal.find({
          _id: { $in: currentUser.journals },
        })
          .limit(limitValue)
          .skip(skipValue);

        return {
          journals: allJournalsByCurrentUser,
          totalJournals: numberOfJournalsByCurrentUser,
        };
      } catch (error) {
        return error;
      }
    },

    getAllJournalsByUserId: async (
      _,
      { userId, currentPageNumber, limitValue }
    ) => {
      try {
        const skipValue = (currentPageNumber - 1) * limitValue;

        const user = await User.findById(userId);

        const numberOfJournalsByUser = user.journals.length;

        const allJournalsByUser = await Journal.find({
          _id: { $in: user.journals },
        })
          .limit(limitValue)
          .skip(skipValue);

        return {
          journals: allJournalsByUser,
          totalJournals: numberOfJournalsByUser,
        };
      } catch (error) {
        return error;
      }
    },

    getJournalByISSN: async (_, { issn }) => {
      try {
        return await Journal.findOne({ issn });
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    createJournal: async (_, { journalToCreate }, { req }) => {
      try {
        const currentUser = await User.findById(req.session.userId);

        const journal = new Journal({
          createdBy: req.session.userId,
          ...journalToCreate,
        });

        const createdJournal = await journal.save();

        currentUser.journals.push(createdJournal.id);

        await currentUser.save();

        return { journal };
      } catch (error) {
        if (error.code === 11000 && Object.keys(error.keyValue)[0] === "issn") {
          return {
            errors: [
              {
                field: "issn",
                message: "A journal with the same ISSN already exists",
              },
            ],
          };
        }
      }
    },

    deleteJournal: async (_, { issnToDelete }) => {
      try {
        const { deletedCount } = await Journal.deleteOne({
          issn: issnToDelete,
        });

        if (deletedCount === 0) {
          return false;
        }

        return true;
      } catch (error) {
        return error;
      }
    },

    updateJournal: async (_, { issnToUpdate, newJournalDetails }) => {
      try {
        const journalToUpdate = await Journal.findOne({ issn: issnToUpdate });

        if (!journalToUpdate) {
          return {
            errors: [{ field: "issn", message: "issn not available" }],
          };
        }

        const { id } = journalToUpdate;

        const updatedJournal = await Journal.findByIdAndUpdate(
          id,
          { ...newJournalDetails },
          { new: true }
        );

        return { journal: updatedJournal };
      } catch (error) {
        if (error.code === 11000 && Object.keys(error.keyValue)[0] === "issn") {
          return {
            errors: [
              {
                field: "issn",
                message: "A journal with the same ISSN already exists",
              },
            ],
          };
        }
      }
    },

    addMockJournalData: async (_, { numberOfJournals, userId }) => {
      try {
        const generatedJournals = generateMockJournalsArray(
          numberOfJournals,
          userId
        );
        await Journal.insertMany(generatedJournals);

        const journalIds = generatedJournals.map((journal) => journal.id);
        const user = await User.findById(userId);
        user.journals.push(...journalIds);
        await user.save();
      } catch (error) {
        return false;
      }

      return true;
    },
  },
};

export default journalResolver;
