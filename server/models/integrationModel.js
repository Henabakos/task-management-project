const mongoose = require("mongoose");

const IntegrationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    type: {
      type: String,
      enum: ["SLACK", "GITHUB", "GOOGLE_DRIVE"],
      required: true,
    },
    config: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Integration", IntegrationSchema);
