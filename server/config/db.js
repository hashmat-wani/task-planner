import mongoose from "mongoose";
import { MONGO_URL } from "../utils/env.js";

export const connectDB = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGO_URL);
};
