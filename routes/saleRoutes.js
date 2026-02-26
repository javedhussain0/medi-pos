import express from "express";
import { createSale, deleteSale, getSaleById, getSales } from "../controllers/saleController.js";
import { protect } from "../middlewere/User.js";

const router = express.Router();

router.get("/", protect, getSales);
router.get("/:id", protect, getSaleById);
router.post("/", protect, createSale);
router.delete("/:id", protect, deleteSale);

export default router;
