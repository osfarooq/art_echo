import express from "express";
import { getAllUsers, getUser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser);
router.get("/allUsers", getAllUsers);
//router.put("/", updateUser)

export default router;