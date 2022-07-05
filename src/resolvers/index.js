import { mergeResolvers } from "@graphql-tools/merge";
import journalResolver from "./journalResolver";
import userResolver from "./userResolver";

const resolvers = [journalResolver, userResolver];

export default mergeResolvers(resolvers);
