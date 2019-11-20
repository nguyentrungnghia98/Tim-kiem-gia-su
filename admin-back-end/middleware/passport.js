const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Lấy thông tin những giá trị auth
var configAuth = require('../config/auth');

const User = require('../models/user');

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

        User.findOneEmail(email)
           .then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Email hoặc Mật khẩu không chính xác !'});
               }

               bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        return cb(null, false, {message: err})
                    }

                    if(!result){
                        return cb(null, false, {message: 'Mật khẩu không chính xác !'})
                    }

                    return cb(null, user, {message: 'Đăng nhập thành công !'});
               })
          })
          .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'dang-ngoc-nghia'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    console.log(jwtPayload);
    return User.findOneEmail(jwtPayload.email)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));

passport.use(new FacebookStrategy({
    // điền thông tin để xác thực với Facebook.
    // những thông tin này đã được điền ở file auth.js
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id','displayName','email','first_name','last_name','middle_name']
},

// Facebook sẽ gửi lại chuối token và thông tin profile của user
function (token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function () {
        // tìm trong db xem có user nào đã sử dụng facebook id này chưa
        User.findOneFacebookID(profile.id)
        .then (user => {

            // Nếu tìm thấy user, cho họ đăng nhập
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // nếu chưa có, tạo mới user
                var entity = {
                    email : profile.emails[0].value,
                    fullName : profile.displayName,
                    facebookID: profile.id,
                    password: token
                };

                // lưu vào db
                User.saveAccountFacebook(entity)
                .then(userFB => {
                    // nếu thành công, trả lại user
                    return done(null,  userFB);
                });
            }

        })
        .catch(err => {
            done(null, false, {message: err.message});
        });
    });

}));
