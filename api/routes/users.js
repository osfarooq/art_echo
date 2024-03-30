import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  getPendingUsers,
  approveUser,
  uploadArt,
} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/allUsers", getAllUsers);
router.delete("/:userId", deleteUser);

router.get("/getPendingUsers", getPendingUsers);
router.post("/approveUser/:id", approveUser);
router.post("/uploadArt/:id", uploadArt);

export default router;
