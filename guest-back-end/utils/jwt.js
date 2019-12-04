const jwt = require('jsonwebtoken');

module.exports = {
    generateJWT: (user, secrectKey, expiresIn) => {
        return jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, secrectKey, {
            expiresIn
        });
    },

    decodeJWT: (token, secretKey) => {
        return jwt.decode(token, secretKey);
    },

    verify: (token, secretKey) => {
        return jwt.verify(token, secretKey);
    }
}