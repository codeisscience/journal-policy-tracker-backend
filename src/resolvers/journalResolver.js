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
      const skipValue = (currentPageNumber - 1) * limitValue;
      const totalJournals = await Journal.count();
      const journals = await Journal.find().limit(limitValue).skip(skipValue);
      return { journals, totalJournals };
    },

    getAllJournalsByCurrentUser: async (
      _,
      { currentPageNumber, limitValue },
      { req }
    ) => {
      const skipValue = (currentPageNumber - 1) * limitValue;

      const currentUser = await User.findById(req.session.userId);

      const allJournalsByCurrentUser = await Journal.find({
        _id: { $in: currentUser.journals },
      })
        .limit(limitValue)
        .skip(skipValue);

      return allJournalsByCurrentUser;
    },

    getAllJournalsByUserId: async (
      _,
      { userId, currentPageNumber, limitValue }
    ) => {
      const skipValue = (currentPageNumber - 1) * limitValue;

      const user = await User.findById(userId);

      const journals = await Journal.find({
        _id: { $in: user.journals },
      })
        .limit(limitValue)
        .skip(skipValue);

      return journals;
    },

    getJournalByISSN: async (_, { issn }) => {
      return await Journal.findOne({ issn });
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

      const { id } = journalToUpdate;
      try {
        await Journal.findByIdAndUpdate(id, { ...newJournalDetails });
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

      const updatedJournal = await Journal.findById(id);
      return { journal: updatedJournal };
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
        console.log(error);
        return false;
      }

      return true;
    },
  },
};

export default journalResolver;
