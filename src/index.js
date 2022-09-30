import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import resolvers from "./resolvers";
import typeDefs from "./types";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";
import { applyMiddleware } from "graphql-middleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { COOKIE_NAME, __prod__ } from "./constants";
import { journalMiddleware } from "./middlewares/journalMiddleware";

const startServer = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  const redis = new Redis();

  app.set("trust proxy", 1);

  if (__prod__) {
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );
  } else {
    var whitelist = [
      "https://studio.apollographql.com",
      "http://localhost:3000",
    ];
    var corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };
    app.use(cors(corsOptions));
  }

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // cannot fetch cookie from front-end at document.cookie
        sameSite: "none",
        secure: true, // cookie only words in https
        domain: __prod__ ? ".frontendDomain1234123412341234.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const server = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      authMiddleware,
      journalMiddleware
    ),
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
