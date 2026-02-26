import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middlewere/User.js";

const router = express.Router();

router.get("/", protect, getCustomers);
router.get("/:id", protect, getCustomerById);
router.post("/", protect, createCustomer);
router.put("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

export default router;
