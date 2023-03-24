import express from "express";
import { googlePassport } from "../config/index.js";

import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = express.Router();

// REGISTER

router.post("/register", registerController.register);

// LOGIN

router.post("/login", loginController.login);

// LOGOUT

router.post("/logout", authenticate, logoutController.logout);

// REFRESH TOKEN

router.get("/refreshtoken", refreshTokenController.refresh);

// GOOGLE OAUTH

router.get(
  "/google",
  googlePassport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  googlePassport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  loginController.oAuthLoginSuccess
);
// Login failed
router.get("/login/failed", (req, res) => {
  return next(CustomErrorHandler.unAuthorised());
});

export default router;
