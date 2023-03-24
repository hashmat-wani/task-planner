import express from "express";
import cors from "cors";
import {
  APP_PORT,
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  DEV_API,
  MODE,
  PROD_API,
} from "./utils/env.js";
import {
  sprintRoute,
  taskRoute,
  authRoute,
  userRoute,
  mailRoute,
} from "./routes/index.js";
import { connectDB, redis } from "./config/index.js";
import { errorHandler } from "./middlewares/index.js";
import cookieParser from "cookie-parser";

const PORT = APP_PORT || 3000;

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: `${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,PATCH",
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

// console.log(await redis.llen("blacklist"));

// -------Routes---------
app.get("/", async (req, res) => {
  res.send("Hello from task-planner");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/sprint", sprintRoute);
app.use("/api/task", taskRoute);
app.use("/api/mail", mailRoute);

// --------Error handler-------
app.use(errorHandler);

// --------DB connection------
connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${MODE === "dev" ? DEV_API : PROD_API}`
      );
    })
  )
  .catch((err) => console.log(err));
