import { mergeTypeDefs } from "@graphql-tools/merge";
import journalType from "./journalType";
import userType from "./userType";

const typeDefs = [journalType, userType];

export default mergeTypeDefs(typeDefs);
