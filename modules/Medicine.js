import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String
    },

    category: {
      type: String,
      enum: ["tablet", "syrup", "injection", "capsule"],
      required: true
    },

    batchNo: {
      type: String,
      required: true
    },

    sellingPrice: {
      type: Number,
      required: true
    },

    gstPercent: {
      type: Number,
      default: 0
    },

    quantity: {
      type: Number,
      default: 0
    },

    expiryDate: {
      type: Date,
      required: true
    },

    manufactureDate: {
      type: Date
    },

   stock:{
    type: Number,
    required: true,
    default: 0
   }
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
