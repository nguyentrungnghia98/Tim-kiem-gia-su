var express = require('express');
var router = express.Router();
const jwt = require('../../utils/jwt');
const topt= require('../../utils/totp');

// Xử lí yêu cầu gửi OTP qua mail
// POST /secure/sendOTPViaMail
router.post('/sendOTPViaMail', (req, res) => {
    req.checkBody('email', 'Email không hợp lệ').notEmpty().isEmail();
    const errors = req.validationErrors();

    if (errors.length > 0) {
        return res.status(400).json({message: 'Email không hợp lệ'});
    }

    const activeCode = topt.generateTOTP(process.env.OTP_SECRET);

    topt.sendOTPViaMail(req.body.email, process.env.OTP_EXPIRE_IN, activeCode, 'Mã OTP')
        .then(() => {
            return res.status(200).json({message: 'Gửi OTP thành công'});
        }).catch(() => {
            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
        })
});

module.exports = router;