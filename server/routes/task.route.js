import express from "express";
import { taskController } from "../controllers/index.js";

const router = express.Router();

router.get("/", taskController.getSprintTasks);

router.post("/", taskController.addTask);

export default router;
