const verifyEmailTemplate = (name, url) => {
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Xác Minh Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                    text-align: center;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    margin: auto;
                }
                .button {
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 12px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Chào ${name},</h2>
                <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào nút bên dưới để xác minh email của bạn:</p>
                <a href="${url}" class="button">Xác Minh Email</a>
                <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,<br>Đội ngũ Hỗ trợ</p>
            </div>
        </body>
        </html>
    `;
};

module.exports = verifyEmailTemplate;
