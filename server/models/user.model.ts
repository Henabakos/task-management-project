import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER", "GUEST"], default: "USER" },
    profileImage: { type: String },
    bio: { type: String, maxlength: 250 },
    oauthProvider: {
      type: String,
      enum: ["google", "github", null],
      default: null,
    },
    oauthId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
