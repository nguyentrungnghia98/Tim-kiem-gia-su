const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET  TAG SKILLS. */
router.get('/',function(req, res, next) {

    User.findAll().then(succ => {
        res.status(200).json(succ);

    })
    .catch(err => {
        res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
    })
    
})

router.get('/teacher',function(req, res, next) {

    User.findTeacher().then(succ => {
        res.status(200).json(succ);

    })
    .catch(err => {
        res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
    })
    
})

router.get('/student',function(req, res, next) {

    User.findStudent().then(succ => {
        res.status(200).json(succ);

    })
    .catch(err => {
        res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
    })
    
})

// router.post('/add', (req, res, next) => {

//     var entity = req.body;
//     TagSkills.add(entity)
//         .then(succ => {
//             res.status(200).json({message: 'Thêm tag skill mới thành công !', tagskill: entity})
//         })
//         .catch(err => {
//             res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
//         });
// });

router.get('/block/:id', (req, res, next) => {

    User.findOneById(req.params.id)
    .then(user => {
        if(user.status === 'block'){
            res.status(400).json({message: 'Lỗi ! Tài khoản của người dùng đang bị khóa !'})
        }else{
            User.updateOne({_id : req.params.id}, {status: 'block'})
            .then(succ => {
                res.status(200).json({message: 'Khóa tài khoản người dùng thành công !'})
            })
            .catch(err => {
                res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
            });
        }
    })    
});

router.get('/active/:id', (req, res, next) => {

    User.findOneById(req.params.id)
    .then(user => {
        if(user.status === 'active'){
            res.status(400).json({message: 'Lỗi ! Tài khoản của người dùng đang hoạt động !'})
        }else{
            User.updateOne({_id : req.params.id}, {status: 'active'})
            .then(succ => {
                res.status(200).json({message: 'Mở khóa tài khoản người dùng thành công !'})
            })
            .catch(err => {
                res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
            });
        }
    })    
});

router.get('/user-detail/:id', (req,res,next) => {

    User.findOneById(req.params.id)
    .then(user => {
        res.status(200).json({user: user});
    })
    .catch(err => {
        res.status(400).json({message: 'Đã xảy ra lỗi !'})
    })

})

// router.post('/update', (req, res, next) => {

//     var entity = req.body;

//     TagSkills.findByIdAndUpdate(entity.id, entity.content)
//         .then(succ => {
//             res.status(200).json({message: 'Cập nhật tag skill thành công !', tagskill: entity})
//         })
//         .catch(err => {
//             res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
//         });
// });

module.exports = router;