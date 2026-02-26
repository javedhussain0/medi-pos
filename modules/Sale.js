import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const saleSchema = new mongoose.Schema(
  {
    billNo: {
      type: Number,
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    mobileNo: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    items: {
      type: [saleItemSchema],
      required: true,
      validate: [(items) => items.length > 0, "At least one item is required"],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    gst: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
