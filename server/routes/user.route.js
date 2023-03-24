import express from "express";
import { userController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// WHO AM I

router.get("/me", authenticate, userController.me);

router.patch("/changepassword", authenticate, userController.changePassword);

router.patch("/resetpassword", userController.resetPassword);

export default router;
