import express from "express";
import { uploadArt, getPendingArtwork, getApprovedArtwork, approveArtwork } from "../controllers/artwork.js";

const router = express.Router();

router.post("/uploadArt", uploadArt);
router.get("/getApprovedArt", getApprovedArtwork);
router.get("/getPendingArt", getPendingArtwork);
router.post("/approveArtwork/:id", approveArtwork)


export default router;
