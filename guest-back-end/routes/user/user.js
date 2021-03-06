﻿var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('../../utils/jwt');
const topt = require('../../utils/totp');
const ChecksumToken = require('../../utils/checksumToken');
const User = require('../../models/user');
const TagSkill = require('../../models/TagSkill');

// Xử lí đăng ký tài khoản
// POST /user/register
router.post('/register', (req, res) => {
    passport.authenticate('local.register', {session: false}, (err, user, info) => {
        if (err){
            return res.status(500).json({message: err.message});
        }
        else if (!user){
            return res.status(400).json({ message: info.message });
        }

        req.login(user, {session: false}, (err) => {
            if (err){
                res.status(500).json({message: err.message});
            }

            let token = jwt.generateJWT(user, process.env.SECRET_KEY, process.env.EXPIRE_IN);
            const { id, username, email, role, avatar, status,
                major, introduction, salaryPerHour, address} = user;
            return res.status(200).json({
                results: {
                    object: {
                        token, id, username, email, role, avatar, status,
                        major, introduction, salaryPerHour, address
                    }
                }
            });
        });
    })(req, res)
});

// Xử lí đăng nhập
// POST /user/login
router.post('/login', (req, res) => {
    passport.authenticate('local.login', {session: false}, (err, user, info) => {
        if (err){
            return res.status(500).json({message: err.message});
        }
        else if (!user){
            return res.status(400).json({message: info.message});
        }

        req.login(user, {session: false}, (err) => {
            if (err){
                res.status(500).json({message: err.message});
            }

            let token = jwt.generateJWT(user, process.env.SECRET_KEY, process.env.EXPIRE_IN);
            return res.status(200).json({
                results: {
                    object: {
                        token, 
                        ...user['_doc']
                    }
                }
            });
        });
    })(req, res)
});

// Xử lí đăng nhập với bên thứ 3
// POST /user/loginSocial
router.post('/loginSocial', (req, res) => {
    passport.authenticate('social.login', {session: false}, (err, user, info) => {
        if (err){
            return res.status(500).json({message: err.message});
        }
        else if (!user){
            return res.status(400).json({message: info.message});
        }

        req.login(user, {session: false}, (err) => {
            if (err){
                res.status(500).json({message: err.message});
            }

            let token = jwt.generateJWT(user, process.env.SECRET_KEY, process.env.EXPIRE_IN);
            const { id, username, email, role, avatar, status,
                major, introduction, salaryPerHour, address} = user;
            return res.status(200).json({
                results: {
                    object: {
                        token, id, username, email, role, avatar, status,
                        major, introduction, salaryPerHour, address
                    }
                }
            });
        });
    })(req, res)
});

// Xử lí thay đổi mật khẩu
// POST /user/change-password
router.post('/changePassword', passIfHaveValidToken, (req, res) => {
    User.findOneByIdWidthPassword({_id: req.userInfo.id})
        .then(user => {
            bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
                if (err) {
                  console.log(err)
                    return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
                } 

                if (!result) {
                    return res.status(400).json({message: 'Mật khẩu không chính xác'});
                }

                bcrypt.hash(req.body.newPassword, 5, (err, hash) => {
                    if (err) {
                        return res.status(500).json({message: err.message});
                    }

                    User.updateOne({_id: user.id}, {password: hash})
                        .then(() => {
                            return res.status(200).json({message: 'Đổi mật khẩu thành công'});
                        })
                        .catch(() => {
                            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
                        });
                    });
            });
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
        });
});

// Xử lí update các thông tin chung với data gửi lên dạng json
// POST /user/update
router.post('/update', passIfHaveValidToken, (req, res) => {
    const entity = {...req.body};
    const { role } = req.body;

    if (entity.password || entity.numberOfStudent || entity.teachedHour || entity.money || entity._id) {
        return res.status(400).json({message: 'data không hợp lệ'});
    }

    if (req.body.role) {
        req.checkBody('role', 'Role không hợp lệ').isIn(['0', '1']);
        const errors = req.validationErrors();

        if (errors.length > 0) {
            return res.status(400).json({message: 'Role không hợp lệ'});
        }
    }

    // Update info user với các thông tin gửi lên
    User.updateOne({_id: req.userInfo.id}, entity)
        .then(() => {
            const token = jwt.generateJWT({...req.userInfo, role}, process.env.SECRET_KEY, process.env.EXPIRE_IN);
            res.status(200).json({
                results: {
                    object: {
                        token, 
                        ...entity
                    }
                }
            });
        }).catch((err) => {res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}); console.log(err)});
});

// Xử lí lấy danh sách giáo viên theo tiêu chí xác định 
// kèm phân trang
// POST /user/getListTeacher
router.post("/getListTeacher", (req, res) => {
    const { page, limit, arrTagSkill, place, fee, sort, searchText } = req.body;
    User.getListTeacherWithPagination(page, limit, arrTagSkill, place, fee, sort, searchText)
        .then((rs) => res.status(200).json({
            results: {
                object: {
                    ...rs
                }
            }
        }))
        .catch((err) => res.status(500).json({message: err.message}));
});

// Xử lí req lấy info của 1 user theo id
// GET /user/:id
router.get('/:id', (req, res) => {
    User.findOneById(req.params.id)
        .then((user) => res.status(200).json({
            results: {
                object: {
                    ...user['_doc']
                }
            }
        }))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
    
});

// Xử lí req đổi mật khẩu khi quên mật khẩu
// POST /user/forgetPassword
router.post('/forgetPassword', (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Kiểm tra mã OTP
    const result = topt.verify(otp, process.env.OTP_SECRET, process.env.OTP_EXPIRE_IN);

    //Nếu mã OTP không chính xác
    if (!result) {
        return res.status(400).json({message: 'OTP không hợp lệ'});
    }

    bcrypt.hash(newPassword, 5, (err, hash) => {
        if (err) {
            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
        }

        User.updateOne({email}, {password: hash})
            .then(() => {
                return res.status(200).json({message: 'Đổi mật khẩu thành công'});
            })
            .catch(() => {
                return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
            });
    });
});

// Xử lí req update tiền của user
// POST /user/updateMoney
router.post('/updateMoney', async (req, res) => {
    const { checksumToken, timestamp, idUser, money } = req.body;
    // const isValid = ChecksumToken.verifyToken(checksumToken, timestamp);

    // if (!isValid) {
    //     return res.status(400).json({message: 'checksumToken không hợp lệ'});
    // }

    try {
        const user = await User.findOneById(idUser);

        if (!user) {
            return res.status(400).json({message: 'user không tồn tại'});
        }

        user.money += Number.parseInt(money);

        if (user.money < 0) {
            return res.status(400).json({message: 'Số dư tài khoản không đủ'});
        }

        await user.save();
        res.status(200).json({
            result: {
                object: {
                    money: user.money
                }
        }});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;

function passIfHaveValidToken(req, res, next){
    // Nếu chưa đăng nhập
    if (!req.isValidToken){
      return res.status(401).json({message: 'Token không hợp lệ'});
    }
  
    next();
  }