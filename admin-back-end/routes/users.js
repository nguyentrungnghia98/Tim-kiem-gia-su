var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var bcrypt = require('bcrypt');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST register
router.post('/register',function (req, res) {
  var entity = req.body;

  User.findOneEmail(entity.email)
  .then(user => {
    if (user){
      return res.status(400).json({err: 'Địa chỉ Email đã tồn tại !'});
    }

    bcrypt.hash(entity.password, 5, (err, passHash) => {
      if(err)
        return res.json({error: err});
      
      User.save(entity, passHash)
      .then(result => {

        const info = {
          id: result.id,
          email: result.email,
          fullName: result.fullName,
          role: result.role
        }

        return res.json({
          message: 'Đăng kí tài khoản thành công !',
          user : info
        })
      })
      
      .catch(err => {
        return res.json({error: err});
      });
    });
  })

  .catch(err => {
    return res.json({error: err});
  });
});


/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {

      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Đăng nhập thất bại !',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
        if (err) {
            res.send('err');
        }

        const info = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            status: user.status,
            avatar: user.avatar         
        }

        const token = jwt.sign(info, 'dang-ngoc-nghia', /*{expiresIn: '5s'}*/);

        return res.json({message: info.message,user: info, token});
      });
  })
  (req, res);

});

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback', passport.authenticate('facebook', {
    session: false,
    failureRedirect: 'http://localhost:2424/login',
}), (req, res) => {
    
    const token = jwt.sign(JSON.stringify(req.user), 'dang-ngoc-nghia');

    res.redirect('http://localhost:2424/login#'+token);
});


module.exports = router;
