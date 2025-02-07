const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["TASK_UPDATE", "MENTION", "COMMENT", "INVITATION", "ALERT"],
      required: true,
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", NotificationSchema);
