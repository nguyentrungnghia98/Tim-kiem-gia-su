const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
    try {
        // Lấy token từ cookie
        let token = req.headers.authorization;
        
        if (!token) {
            return next();
        }

        // Xác thực token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userInfo = decode;
        // Đánh dấu tài user đã đăng nhập
        req.isValidToken = true;
    } catch(err) {
        req.isValidToken = false;
    } 

    next();
}