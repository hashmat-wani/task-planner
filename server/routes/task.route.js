import express from "express";
import { authenticate } from "../middlewares/index.js";
import { taskController } from "../controllers/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/:sprintId", taskController.getSprintTasks);

router.post("/", taskController.addTask);

export default router;
