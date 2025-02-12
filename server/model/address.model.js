import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
    },
    city: {
        type: String,
        default: ""
    },
    state : {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
    },
    country : {
        type: String,
    },
    mobile : {
        type: Number,
        default: null
    }
},{
    timestamps: true,
})

const AddressModel = mongoose.model("address", addressSchema)

export default AddressModel