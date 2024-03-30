import express from "express";
import {
  getRelationships,
  getFriends,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.get("/friends/:id", getFriends);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
