import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ["bug", "feature", "story"],
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    required: true,
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Task = mongoose.model("Task", taskSchema);
