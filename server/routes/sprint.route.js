import express from "express";
import { sprintController } from "../controllers/index.js";

const router = express.Router();

router.get("/", sprintController.getAllSprints);

router.post("/", sprintController.addSprint);

export default router;
