import { mergeTypeDefs } from "@graphql-tools/merge";
import journalType from "./journalType";

const typeDefs = [journalType];

export default mergeTypeDefs(typeDefs);
