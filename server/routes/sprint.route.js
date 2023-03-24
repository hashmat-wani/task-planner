import express from "express";
import { sprintController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/", sprintController.getAllSprints);

router.post("/", sprintController.addSprint);

router.delete("/:sprintId", sprintController.deleteSprint);

router.patch("/:id", sprintController.editSprint);

export default router;
