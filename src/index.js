import { ApolloServer, gql } from "apollo-server-express";
import "dotenv/config";
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

  mongoose.connect(process.env.DATABASE_URL);

  console.log(process.env.PORT);
  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `GraphQL path is http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
};

startServer();
