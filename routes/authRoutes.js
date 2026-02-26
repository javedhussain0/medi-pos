import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  register,
  updateMyProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewere/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.put("/change-password", protect, changePassword);

export default router;
