import mongoose from "mongoose";
import { MONGODB_URL } from "../utils/env";

const connectDB = () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(MONGODB_URL);
};

export default connectDB;
