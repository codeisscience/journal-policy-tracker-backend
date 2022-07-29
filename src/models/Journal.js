import mongoose, { Schema } from "mongoose";

const journalSchema = new mongoose.Schema(
  {
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
      unique: true,
    },

    domainName: {
      type: String,
      required: true,
    },

    policies: {
      title: {
        type: String,
        required: true,
      },

      firstYear: {
        type: Number,
        required: true,
      },

      lastYear: {
        type: Number,
      },

      policyType: {
        type: String,
        required: true,
      },
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

export const Journal = mongoose.model("Journal", journalSchema);
