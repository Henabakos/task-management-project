import mongoose from "mongoose";

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

export default mongoose.model("Integration", IntegrationSchema);
