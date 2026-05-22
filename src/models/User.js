import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

UserSchema.methods.toPublicJSON = function () {
  return { id: this._id.toString(), name: this.name, email: this.email };
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
