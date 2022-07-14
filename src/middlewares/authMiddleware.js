import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((_, __, { req }) => {
  return !!req.session.userId;
});

export const authMiddleware = shield({
  Mutation: {
    createJournal: isAuthenticated,
    updateJournal: isAuthenticated,
    deleteJournal: isAuthenticated,
  },
});
