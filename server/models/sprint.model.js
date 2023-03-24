import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Sprint = mongoose.model("Sprint", sprintSchema);
