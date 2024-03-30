import express from "express";
import { getMarketItems, getItem, uploadMarketItem } from "../controllers/market.js";

const router = express.Router()

router.get("/getItems", getMarketItems);
router.get("/getItem/:id", getItem);
router.post("/uploadItem", uploadMarketItem); 

export default router;