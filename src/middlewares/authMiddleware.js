import { rule, shield, and, or } from "graphql-shield";
import { User } from "../models/User";

const isAuthenticated = rule()((_, __, { req }) => {
  return !!req.session.userId;
});

const isAdmin = rule()(async (_, __, { req }) => {
  const user = await User.findById(req.session.userId);
  return user && user.role === "ADMIN";
});

const isModerator = rule()(async (_, __, { req }) => {
  const user = await User.findById(req.session.userId);
  return user && user.role === "MODERATOR";
});

export const authMiddleware = shield({
  Query: {
    // user queries
    getAllUsers: and(isAuthenticated, or(isAdmin, isModerator)),

    // journal queries
    getAllJournalsByUserId: isAuthenticated,
    getAllJournalsByCurrentUser: isAuthenticated,
  },

  Mutation: {
    // user mutations
    addMockUserData: and(isAuthenticated, isAdmin),
    logout: isAuthenticated,
    changeUsername: isAuthenticated,
    changePassword: isAuthenticated,

    // journal mutations
    addMockJournalData: and(isAuthenticated, isAdmin),
    createJournal: isAuthenticated,
    updateJournal: and(isAuthenticated, or(isAdmin, isModerator)),
    deleteJournal: and(isAuthenticated, or(isAdmin, isModerator)),
  },
});
