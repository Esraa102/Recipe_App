import express from "express";
import {
  getCurrentUser,
  loginUser,
  register,
} from "../controllers/userControllers.js";
import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/current", validateToken, getCurrentUser);

export { router as userRouter };
