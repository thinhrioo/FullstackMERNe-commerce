const jwt = require('jsonwebtoken');

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: '7d' } // Refresh Token có thời hạn 7 ngày
    );
};

module.exports = generateRefreshToken;
