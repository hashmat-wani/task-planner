import * as dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  MONGO_URL,
  DEV_API,
  PROD_API,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  MODE,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;
