const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

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
    let errors = req.validationErrors();

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

    User.findOneAccountActiveById(email)
        .then(user => {
            if (!user){
                return done(null, false, {message: 'Email không tồn tại.'});
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