const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');

const User = require('../models/user-admin');

/* GET user profile. */
router.get('/', function (req, res, next) {

  const user = req.user;
  if (user) {
    const info = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      role: user.role
    }
    res.status(200).json(info);
  } else {
    res.status(400).json({
      message: err.info
    })
  }
})

/* POST user */
router.post('/update-profile', (req, res) => {

  var entity = req.body;

  // Kiểm tra các field có hợp lệ hay không
  if (!entity.password && !entity.repassword) {
    return res.status(400).json({
      message: 'Bạn chưa nhập mật khẩu !'
    });
  }

  if (entity.password !== entity.repassword) {
    return res.status(400).json({
      message: 'Mật khẩu không trùng khớp !'
    });
  }

  bcrypt.hash(entity.password, 5, (err, passHash) => {
    if (err)
      return res.json({
        error: err
      });

    const newObject = {
      password: passHash
    };

    User.update({
        _id: req.user.id
      }, newObject)
      .then((result) => {
        res.status(200).json({
          message: 'Cập nhật tài khoản thành công !'
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });
      });
  });

});

module.exports = router;