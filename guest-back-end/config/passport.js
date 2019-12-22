const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const topt= require('../utils/totp');
const jwt = require('../utils/jwt');

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser');
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Xử lí đăng ký
passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    // Kiểm tra các field có hợp lệ hay không
    req.checkBody('email', 'Email không hợp lệ').notEmpty().isEmail();
    req.checkBody('password', 'Mật khẩu không hợp lệ.').notEmpty().isLength({min: 4, max: 20});
    req.checkBody('username', 'Họ tên không hợp lệ').notEmpty().isLength({min: 1, max: 50});
    req.checkBody('role', 'Quyền không hợp lệ').notEmpty().isIn(['1', '0']);
    const errors = req.validationErrors();

    if (errors.length > 0){
        let message = '';

        errors.forEach(error => {
            message = `${error.msg}\n${message}`;
        });
        return done(null, false, {message});
    }

    // Kiểm tra tài khoản đã tồn tại hay chưa
    User.findOneByEmail(email)
        .then(user => {
            // Nếu tồn tại
            if (user){
                return done(null, false, {message: 'Email đã được sử dụng.'});
            }

            // Kiểm tra mã OTP
            const result = topt.verify(req.body.activeCode, process.env.OTP_SECRET, process.env.OTP_EXPIRE_IN);
            
            // Nếu mã OTP không chính xác
            if (!result) {
                return done(null, false, {message: 'Mã OTP không chính xác'});
            }

            bcrypt.hash(password, 5, (err, hash) => {
                if (err){
                    return done(err);
                }

                // Lưu vào tài khoản vào db
                User.registerAccount(req.body, hash)
                    .then(rs => done(null, rs))
                    .catch(err => done(err));
            });
        })
}));

// Xử l1 đăng nhập
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    // Kiểm tra các field có hợp lệ
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4, max: 20});
    let errors = req.validationErrors();

    if (errors.length > 0){
        let messages = [];

        errors.forEach(error => {
            messages.push(error.msg);
        });

        return done(null, false, {message: 'Email hoặc mật khẩu không hợp lệ.'});
    }

    User.findOneByEmail(email)
        .then(user => {
            if (!user){
                return done(null, false, {message: 'Email không tồn tại.'});
            }

            if (user.status != 'active') {
                return done(null, false, {message: 'Tài khoản đã bị khóa'});
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err){
                    return done(err);
                }

                if (!result){
                    return done(null, false, {message: 'Email hoặc mật khẩu không đúng.'});
                }

                return done(null, user);
            });
        })
        .catch(err => done(err));
}));

passport.use('social.login', new LocalStrategy({
    usernameField: 'token',
    passwordField: 'token',
    passReqToCallback: true
}, (req, noNeed1, noNeed2, done) => {
    const jwtToken = req.body.token;
    let userInfo;
    try {
        userInfo = jwt.verify(jwtToken, process.env.SECRET_KEY);
        console.log('userInfo', userInfo)
    } catch(err) {
        return done(null, false, {message: 'Token không hợp lệ'});
    }

    User.findOneByEmail(userInfo.email)
        .then((user) => {
            if (!user) {
                User.registerSocialAccount(userInfo)
                    .then((rs) => done(null, rs))
                    .catch((err) => done(err));
            } else {
                if (user.status != 'active') {
                    return done(null, false, {message: 'Tài khoản đã bị khóa'});
                }
                return done(null, user);
            }
        }).catch((err) => done(err));
}));