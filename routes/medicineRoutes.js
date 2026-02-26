import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getMedicineById,
  getMedicines,
  updateMedicine,
} from "../controllers/medicineController.js";
import { authorize, protect } from "../middlewere/User.js";

const router = express.Router();

router.get("/", protect, getMedicines);
router.get("/:id", protect, getMedicineById);
router.post("/", protect, authorize("admin"), createMedicine);
router.put("/:id", protect, authorize("admin"), updateMedicine);
router.delete("/:id", protect, authorize("admin"), deleteMedicine);

export default router;
