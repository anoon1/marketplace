const secretKey = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');

/**********************Function for checking jwt token expires or not****************/
exports.jwtExpTme=async function(token) {
    return new Promise((resolve, reject) => {
        try {
            const decoded = jwt.verify(token, secretKey);
            console.log(decoded);

            const currentTimestamp = Date.now();
            console.log(decoded.exp * 1000 < currentTimestamp);
            if (decoded.exp * 1000 < currentTimestamp) {
                console.log('The token is expired');
                resolve('expired');
            } else {
                resolve('');
            }
        } catch (err) {
            console.log('Error while getting expiry date of token');

            // Check if the error is due to token expiration
            if (err.name == 'TokenExpiredError') {
                resolve('expired');
            } else {
                // Handle other JWT verification errors
                if (err.name == 'JsonWebTokenError') {
                    resolve('invalidToken');
                }else{
                    resolve('');
                }
            }
        }
    });
}

/******************validate email************************/
exports.isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
