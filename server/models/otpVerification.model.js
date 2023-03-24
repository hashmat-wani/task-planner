import mongoose from "mongoose";
const otpVerificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    otp: { type: String, required: true },
    type: { type: String, required: true },
    expiresIn: { type: Date, required: true },
  },
  { versionKey: false }
);

export const OTPVerification = mongoose.model(
  "OTPVerification",
  otpVerificationSchema
);
