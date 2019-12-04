const speakeasy = require('speakeasy');
const mailer = require('../config/mail');

module.exports = {
    generateTOTP: (secret) => {
        // const secret = speakeasy.generateSecret({length: 20}).base32;
        return speakeasy.totp({
                secret: secret,
                encoding: 'base32'
            });
    },

    verify: (token, secret, expiresIn, ) => {
        return speakeasy.totp.verify({
            secret: secret,
            token: token,
            encoding: 'base32',
            window: expiresIn * 2
        });
    },

    sendOTPViaMail: (email, expiresIn, OTP, subject) => {
        // Cấu hình thư gửi
        const mailOptions = {
            from: '"Gia Sư (NO REPLY)" <newsfeed.notification.k16@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject,
            html: `Mã OTP của bạn là <strong>${OTP}</strong> (chỉ tồn tại trong ${expiresIn} phút)`
        };

        // Gửi mail xác nhận
        return mailer.sendMail(mailOptions);
    }
}