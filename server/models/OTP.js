import mongoose from "mongoose";

const otpScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expireIn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Otp", otpScheme);
