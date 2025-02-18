const bcrypt = require('bcrypt'); // Mã hóa mật khẩu
const UserModel = require('../model/user.model'); // Import model User
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const sendEmail = require('../config/sendEmail');

const UserController = {
    registerUserController: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if(!name || !email || !password) {
                return res.status(400).json({ 
                    message: "Vui lý nhập thống tin",
                    error: true,
                    success: false
                });
            }
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ 
                    message: "Email đã tồn tại",
                    error: true,
                    success: false
                 });
            }

            // Mã hóa mật khẩu trước khi lưu vào database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo user mới
            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword, // Lưu mật khẩu đã mã hóa 
            });

            // Lưu user vào database
            const save = await newUser.save();

            const verifyEmail = await sendEmail({
                sendTo : email,
                subject: "Xác nhận đăng ký tài khoản",
                html: verifyEmailTemplate({
                    name,
                    url: `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
            })
        })
        
           return res.status(201).json({ 
                message: "Đăng ký thành công", 
                error: false,
                success: true,
                data: save
            });

        } catch (error) {
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }
}

module.exports = UserController;
