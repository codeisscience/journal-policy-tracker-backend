import mongoose, { Schema, Model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    journals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Journal",
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
