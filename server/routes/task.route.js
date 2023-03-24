import express from "express";
import { authenticate } from "../middlewares/index.js";
import { taskController } from "../controllers/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/", taskController.getSprintTasks);

router.post("/", taskController.addTask);

export default router;
