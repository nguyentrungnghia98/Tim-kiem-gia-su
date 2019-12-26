const sha256 = require('js-sha256').sha256;

module.exports = {
    verifyToken: (checksumToken, timestamp) => {
        const token = sha256.hex(`${process.env.API_USER}|${timestamp}|${process.env.API_PASSWORD}`);
        
        return token === checksumToken;
    }
}