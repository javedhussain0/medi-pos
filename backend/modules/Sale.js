import mongoose from "mongoose";


const saleShema = new mongoose.Schema({
    billNo: {
        type: Number,
        required: true,
        unique: true,

    },
    CustomerId: {
        name: String,
        required: true,
        trim: true,
        minlength: 2
    },
    date: {
        type: Date,
        required: true,
        default: Date.now


    },
    mobileNo: {
        type: Number,
        required: true,
        trim: true,
        minlength: 10,


    },
    item: {
        type: Array,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,

    },
    gst: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true
    })

export default mongoose.model("Sale", saleShema);
const Sale = mongoose.model("Sale", saleShema);