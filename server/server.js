import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { APP_PORT } from "./utils/env.js";
const app = express();

const PORT = APP_PORT || 3000;
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello from task-planner");
});

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log("server running");
    })
  )
  .catch((err) => console.log(err));
