import { ApolloServer } from "apollo-server-express";
import typeDefs from "../src/types";
import resolvers from "../src/resolvers";
import { authMiddleware } from "../src/middlewares/authMiddleware";
import { journalMiddleware } from "../src/middlewares/journalMiddleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

export const testingServer = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),

    authMiddleware,
    journalMiddleware
  ),

  context: ({ req, res }) => ({ req: { session: {} }, res }),
});
