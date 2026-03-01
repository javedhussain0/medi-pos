import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
