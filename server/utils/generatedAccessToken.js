const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '5h' } // Access Token có thời hạn 5h
    );
};

module.exports = generateAccessToken
