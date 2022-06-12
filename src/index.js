import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./types";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/testMongo");

  app.listen({ port: 4000 }, () => {
    console.log(`GraphQL path is http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
