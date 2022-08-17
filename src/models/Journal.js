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
      type: String,
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
        enum: ["Number One", "Number Two", "Number Three", "Number Four"],
        required: true,
      },

      isDataAvailabilityStatementPublished: {
        type: Boolean,
        required: true,
      },

      isDataShared: {
        type: Boolean,
        required: true,
      },

      isDataPeerReviewed: {
        type: Boolean,
        required: true,
      },

      enforced: {
        type: String,
        enum: [
          "Yes - Before Publication",
          "Sometimes - Post-Publication Audit",
          "No - Not Enforced",
        ],
        required: true,
      },

      enforcedEvidence: {
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
