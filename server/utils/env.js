import * as dotenv from "dotenv";
dotenv.config();

export const { APP_PORT, MONGODB_URL } = process.env;
