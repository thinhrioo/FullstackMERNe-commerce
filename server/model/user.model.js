const mongoose = require("mongoose");

// Định nghĩa schema (cấu trúc) cho bảng User trong MongoDB
const userSchema =  new mongoose.Schema({
    name : {
        type : String, // Kiểu dữ liệu chuỗi
        required : [true, "provide name"] // Bắt buộc nhập, nếu không sẽ có thông báo lỗi
    },
    email : {
        type : String, 
        required : [true, "provide email"], // Bắt buộc nhập
        unique : true // Không được trùng lặp giữa các user
    },
    password : {
        type : String,
        required : [true, "provide password"] // Bắt buộc nhập
    },
    avatar : {
        type : String, // Đường dẫn ảnh đại diện của user
        default : "" // Nếu không có ảnh thì mặc định là chuỗi rỗng
    },
    mobile : {
        type : Number, // Số điện thoại của user
        default : null // Mặc định là null nếu không có
    },
    refresh_token : {
        type : String, // Token để làm mới phiên đăng nhập
        default : ""
    },
    verify_email : {
        type : Boolean, // Xác nhận email đã được verify hay chưa
        default : false // Mặc định là chưa xác nhận
    },
    last_login_date : {
        type : Date, // Lưu ngày đăng nhập gần nhất
        default : "" // Mặc định rỗng nếu chưa đăng nhập lần nào
    },
    status : {
        type : String,
        enum : ["Active", "Inactive","Suspected"], // Trạng thái của user
        default : "Active" // Mặc định là đang hoạt động
    },
    address_detail : [
        {
            type : mongoose.Schema.Types.ObjectId, // Liên kết với bảng địa chỉ
            ref : "address" // Tham chiếu đến model "address"
        }
    ],
    shopping_cart : [
        {
            type : mongoose.Schema.Types.ObjectId, // Liên kết với giỏ hàng của user
            ref : "cartProduct" // Tham chiếu đến model "cartProduct"
        }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.Types.ObjectId, // Liên kết với lịch sử đơn hàng của user
            ref : "order" // Tham chiếu đến model "order"
        }
    ],
    forgot_password_otp : {
        type : String, // Mã OTP để reset mật khẩu
        default : null
    },
    forgot_password_expiry : {
        type : String, // Thời gian hết hạn của OTP quên mật khẩu
        default : ""
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"], // Phân quyền cho user (Admin hoặc User)
        default: "USER" // Mặc định là User
    }
},{
    timestamps : true // Tự động thêm createdAt và updatedAt vào document
})

// Tạo model User dựa trên schema đã định nghĩa
const UserModel = mongoose.model("user", userSchema)

// Xuất model để có thể sử dụng ở các file khác
module.exports = UserModel
