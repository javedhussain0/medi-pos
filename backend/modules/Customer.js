import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        minlength : 2
    },
    phone:{
        type : Number,
        required : true,
    },
    address:{
        type : String,
        minlength: 3,

    },

},
    {timestamps: true}
);

const Customer = mongoose.Schema("Customer", customerSchema);
export default Customer;