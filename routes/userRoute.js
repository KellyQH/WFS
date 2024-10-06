import { Router } from "express";
import { createProfile, updateProfile, getProfile, getProfileByUserId } from "../controllers/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Apply the authentication middleware to profile routes
router.post("/create-profile", authMiddleware.authentication, createProfile);
router.get("/get-profile", authMiddleware.authentication, getProfile);
router.put("/update-profile", authMiddleware.authentication, updateProfile);
router.get("/profile/:userId", authMiddleware.authentication, getProfileByUserId);

export default router;
