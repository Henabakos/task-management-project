import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, maxlength: 500 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["OWNER", "EDITOR", "VIEWER"],
          default: "VIEWER",
        },
      },
    ],
    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PRIVATE",
    },
    deadline: { type: Date },
    activityLog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
