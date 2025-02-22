const bcrypt = require('bcrypt');
const UserModel = require('../model/user.model');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const sendEmail = require('../config/sendEmail');

const UserController = {
    registerUserController: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ 
                    message: "Vui lòng nhập thông tin", 
                    error: true,
                    success: false
                });
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ 
                    message: "Email đã tồn tại", 
                    error: true,
                    success: false
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ name, email, password: hashedPassword });
            const savedUser = await newUser.save();

            const verifyEmailHtml = verifyEmailTemplate(name, `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`);
            await sendEmail({
                sendTo: email,
                subject: "Xác nhận đăng ký tài khoản",
                html: verifyEmailHtml
            });

            return res.status(201).json({ 
                message: "Đăng ký thành công", 
                error: false,
                success: true,
                data: savedUser
            });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    },
    verifyEmailController: async (req, res) => {
        try {
            const { code } = req.query;
            if (!code) {
                return res.status(400).json({ 
                    message: "Mã xác minh không hợp lệ", 
                    error: true, 
                    success: false 
                });
            }
    
            const user = await UserModel.findById(code);
            if (!user) {
                return res.status(400).json({ 
                    message: "Người dùng không tồn tại", 
                    error: true, 
                    success: false 
                });
            }
    
            if (user.isVerified) {
                return res.status(400).json({ 
                    message: "Email đã được xác minh trước đó", 
                    error: true, 
                    success: false 
                });
            }
    
            const updateUser = await UserModel.findByIdAndUpdate(
                code,
                { isVerified: true },
                { new: true } // Trả về user sau khi cập nhật
            );
    
            if (!updateUser) {
                return res.status(500).json({ 
                    message: "Cập nhật thất bại", 
                    error: true, 
                    success: false 
                });
            }
    
            return res.status(200).json({ 
                message: "Xác minh email thành công", 
                error: false, 
                success: true 
            });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    },
    loginController: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ 
                    message: "Email và mật khẩu không được để trống", 
                    error: true, 
                    success: false 
                });
            }
    
            const user = await UserModel.findOne({ email }).select("+password");
            if (!user) {
                return res.status(400).json({ 
                    message: "người dùng chưa từng đăng ký", 
                    error: true, 
                    success: false 
                });
            }
            if(!user.status !== "Active"){
                return res.status(400).json({ 
                    message: "tài khoản có vấn đề, vui lòng liên hệ với Admin", 
                    error: true, 
                    success: false 
                });
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            
            if (!checkPassword) {
                return res.status(400).json({ 
                    message: "Mật khẩu không đúng", 
                    error: true, 
                    success: false 
                });
            }
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error:error.message });
        }

    } 
    
};

module.exports = UserController;
