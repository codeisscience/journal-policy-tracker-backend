import { gql } from "apollo-server-express";
import { ApolloServer } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
  },
};

it("returns hello with the provided name", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const result = await testServer.executeOperation({
    query: "query SayHelloWorld($name: String) { hello(name: $name) }",
    variables: { name: "world" },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data?.hello).toBe("Hello world!");
});
