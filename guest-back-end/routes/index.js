var express = require('express');
var router = express.Router();
const User = require('../models/user');

// Xử lí lấy thông tin user
// GET /me
router.get('/me', passIfHaveValidToken, function(req, res) {
    User.findOneById(req.userInfo.id)
      .then(user => {
        return res.status(200).json({
          results: {
            object: {
              username: user.username,
              email: user.email,
              id: user.id,
              avatar: user.avatar,
              role: user.role,
              major: user.major,
              salaryPerHour: user.salaryPerHour,
              status: user.status
            }
          }
        });
      }).catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

module.exports = router;

function passIfHaveValidToken(req, res, next){
  // Nếu chưa đăng nhập
  if (!req.isValidToken){
    return res.status(401).json({message: 'Token không hợp lệ'});
  }

  next();
}