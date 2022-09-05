import mongoose from "mongoose";

// export const createTestConnection = async () =>
//   mongoose.createConnection("mongodb://localhost:27017/testingDatabase");

export const createTestConnection = async () =>
  mongoose.connect("mongodb://localhost:27017/testingDatabase");
