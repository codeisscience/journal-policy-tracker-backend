import { Journal } from "../models/Journal";
import { User } from "../models/User";

export const journalMiddleware = {
  Mutation: {
    deleteJournal: async (resolve, parent, args, context, info) => {
      try {
        const journalToDelete = await Journal.findOne({
          issn: args.issnToDelete,
        });

        await User.findByIdAndUpdate(
          journalToDelete.createdBy,
          {
            $pull: {
              journals: journalToDelete._id,
            },
          },
          { safe: true }
        );
      } catch (error) {
        console.log(error);
      }

      return resolve(parent, args, context, info);
    },
  },
};
