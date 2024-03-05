import express from "express";
import { getMarketItems, uploadMarketItem } from "../controllers/market.js";

const router = express.Router()

router.get("/getItems", getMarketItems);
router.post("/uploadItem", uploadMarketItem);

export default router;