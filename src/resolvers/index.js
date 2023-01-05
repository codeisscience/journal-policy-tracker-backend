import { mergeResolvers } from "@graphql-tools/merge";
import journalResolver from "./journalResolver";
import updateUserResolver from "./updateUserResolver";
import userResolver from "./userResolver";

const resolvers = [journalResolver, userResolver, updateUserResolver];

export default mergeResolvers(resolvers);
