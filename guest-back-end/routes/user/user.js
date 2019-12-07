var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('../../utils/jwt');
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
    User.findOneById({_id: req.userInfo.id})
        .then(user => {
            bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
                } 

                if (!result) {
                    return res.status(400).json({message: 'Mật khẩu không chính xác'});
                }

                bcrypt.hash(req.body.newPassword, 5, (err, hash) => {
                    if (err) {
                        return res.status(500).json({message: err.message});
                    }

                    User.update({_id: user.id}, {password: hash})
                        .then(() => {
                            return res.status(200).json({message: 'Đổi mật khẩu thành công'});
                        })
                        .catch(() => {
                            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
                        });
                    });
            });
        }).catch(() => {
            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
        });
});

// Xử lí update các thông tin chung với data gửi lên dạng json
// POST /user/update
router.post('/update', passIfHaveValidToken, (req, res) => {
    const entity = {...req.body};
    const { role } = req.body;

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
    const { page, limit } = req.body;
    console.log(req.body);
    User.getListTeacherWithPagination(page, limit)
        .then((rs) => res.status(200).json(rs))
        .catch((err) => res.status(400).json({message: err.message}));
});

module.exports = router;

function passIfHaveValidToken(req, res, next){
    // Nếu chưa đăng nhập
    if (!req.isValidToken){
      return res.status(401).json({message: 'Token không hợp lệ'});
    }
  
    next();
  }