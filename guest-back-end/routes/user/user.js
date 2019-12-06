var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('../../config/multer-disk-storage');
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

// Xử lí kích hoạt tài khoản
// POST /user/active
// router.post('/active', (req, res) => {
//     User.findOneById(req.body.userId)
//         .then((user) => {
//             // Kiểm tra tài khoản đã kích hoạt chưa
//             if (user.status !== 'pendingActive') {
//                 return res.status(400).json({message: 'Tài khoản đã được kích hoạt'});
//             }

//             // Kiểm tra mã OTP
//             const result = topt.verify(req.body.activeCode, process.env.OTP_SECRET, process.env.OTP_EXPIRE_IN);

//             // Nếu mã OTP không chính xác
//             if (!result) {
//                 return res.status(400).json({message: 'Mã OTP không chính xác'});
//             }

//             User.updateOne({_id: req.body.userId}, {status: 'active'})
//                 .then(() => {
//                     return res.status(200).json({message: 'Kích hoạt tài khoản thành công'});
//                 }).catch(() => {
//                     return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
//                 });
//         });

// });

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

// // Xử lí thay đổi thông tin cá nhân
// // POST /user/updatProfile
// router.post('/updateProfile', passIfHaveValidToken, (req, res) => {

//     // Kiểm tra các field có hợp lệ hay không
//     req.checkBody('username', 'Invalid username').notEmpty().isLength({min:1, max: 50});

//     let errors = req.validationErrors();

//     if (errors.length > 0){
//         let messages = [];

//         errors.forEach(error => {
//             messages.push(error.msg);
//         });

//         return res.status(400).json({messages: messages});
//     }

//     const propertiesUpdate = {
//         username: req.body.username,
//         email: req.body.email
//     };

//     User.update({_id: req.user.id}, propertiesUpdate)
//         .then((result) => {
//             res.status(200).json({messages: ['update profile successfully']});
//         }).catch(err => {
//             res.status(500).json({messages: [err.message]});
//         });
// });

// // Xử lí update avatar
// // POST /user/update-avatar
// router.post('/updateAvatar', passIfHaveValidToken, multer.single('avatar'),(req, res) => {
//     var propertiesUpdate = {
//         avatar: `img/${req.user.id}${req.file.originalname}`
//     }

//     User.update({_id: req.user.id}, propertiesUpdate)
//         .then((result) => {
//             res.status(200).json({ 
//                 messages: ['update avatar successfully'],
//                 data: {
//                     urlImg: `images/${req.user.id}${req.file.originalname}`
//                 }
//             });
//         }).catch(err => {
//             res.status(500).json({messages: [err.message]});
//         });
// });

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
                        return res.status(400).json({messages: [err.message]});
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
        }).catch(() => {
            return res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
        });
});

// Xử lí update các thông tin chung với data gửi lên dạng json
// POST /user/updateWithFormData
// router.post('/updateWithFormData', passIfHaveValidToken, multer.single('avatar'), (req, res) => {
//     const { username, role, salaryPerHour, major, introduction, address} = req.body;
//     let avatar;

//     if (req.file){
//         avatar = `img/${req.userInfo.id}${req.file.originalname}`;
//     }
     

//     if (role) {
//         req.checkBody('role', 'Role không hợp lệ').isIn(['0', '1']);
//         const errors = req.validationErrors();

//         if (errors.length > 0) {
//             return res.status(400).json({message: 'Role không hợp lệ'});
//         }
//     }

//     // Update info user với các thông tin gửi lên
//     User.updateOne({_id: req.userInfo.id}, { username, role, salaryPerHour, major, introduction, address, avatar})
//         .then(() => {
//             const token = jwt.generateJWT({...req.userInfo, role}, process.env.SECRET_KEY, process.env.EXPIRE_IN);
//             res.status(200).json({
//                 results: {
//                     object: {
//                         token, username, role, salaryPerHour, major, introduction, address, avatar
//                     }
//                 }
//             });
//         }).catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
// });

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

module.exports = router;

function passIfHaveValidToken(req, res, next){
    // Nếu chưa đăng nhập
    if (!req.isValidToken){
      return res.status(401).json({message: 'Token không hợp lệ'});
    }
  
    next();
  }