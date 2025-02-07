const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
    labels: [{ type: String }],
    attachments: [{ url: String, name: String }],
    subtasks: [
      {
        title: { type: String },
        status: { type: String, enum: ["TODO", "DONE"], default: "TODO" },
      },
    ],
    history: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
