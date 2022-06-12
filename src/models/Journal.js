import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  issn: {
    type: Number,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

export const Journal = mongoose.model("Journal", JournalSchema);
