import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
    },
    email : {
        type : String, 
        required : [true, "provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    last_login_date : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum : ["Active", "Inactive","Suspected"],
        default : "Active"
    },
    address_detail : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "address"
        }
    ],
    shopping_cart : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "cartProduct"
    }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "order"
        }
    ],
    forgot_password_otp : {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : String,
        default : ""
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
},{
    timestamps : true
})

const UserModel = mongoose.model("user", userSchema)

export default UserModel