import { ApolloServer, gql } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./types";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

const startServer = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  const redis = new Redis();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: "https://studio.apollographql.com",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "obfc",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // cannot fetch cookie from front-end at document.cookie
        sameSite: "none",
        secure: true, // cookie only words in https
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, redis }),
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  mongoose.connect(process.env.DATABASE_URL);

  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `GraphQL path is http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
};

startServer();
