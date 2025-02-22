const { Resend } = require('resend'); // Import theo cách đúng
const dotenv = require('dotenv'); // Import dotenv để đọc biến môi trường

dotenv.config(); // Load các biến từ file .env

// Kiểm tra nếu RESEND_API chưa được thiết lập
if (!process.env.RESEND_API) {
    console.log('Please set RESEND_API environment variable.');
}

const resend = new Resend(process.env.RESEND_API); // Khởi tạo Resend đúng cách

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'EcommercePersonal <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Lỗi gửi email:', error);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Lỗi trong quá trình gửi email:', error);
        return null;
    }
};

module.exports = sendEmail;
