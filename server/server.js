import express from "express";
import cors from "cors";
import { APP_PORT, DEV_API, MODE, PROD_API } from "./utils/env.js";
import {
  sprintRoute,
  taskRoute,
  authRoute,
  userRoute,
} from "./routes/index.js";
import { connectDB, redis } from "./config/index.js";
import { errorHandler } from "./middlewares/index.js";

const app = express();

const PORT = APP_PORT || 3000;
app.use(cors());

// console.log(await redis.llen("blacklist"));

// -------Routes---------
app.get("/", async (req, res) => {
  res.send("Hello from task-planner");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/sprint", sprintRoute);
app.use("/api/task", taskRoute);

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
