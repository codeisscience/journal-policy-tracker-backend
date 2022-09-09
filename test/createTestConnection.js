import mongoose from "mongoose";

export const createTestConnection = async () =>
  mongoose.connect("mongodb://localhost:27017/testingDatabase");
