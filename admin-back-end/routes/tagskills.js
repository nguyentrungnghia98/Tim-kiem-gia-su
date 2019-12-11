const express = require('express');
const router = express.Router();

const TagSkills = require('../models/tagskills');

/* GET  TAG SKILLS. */
router.get('/',function(req, res, next) {

    TagSkills.findAll().then(succ => {
        res.status(200).json(succ);

    })
    .catch(err => {
        res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
    })
    
})

router.post('/add', (req, res, next) => {

    var entity = req.body;
    TagSkills.add(entity)
        .then(succ => {
            res.status(200).json({message: 'Thêm tag kĩ năng mới thành công !', tagskill: succ})
        })
        .catch(err => {
            res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
        });
});

router.get('/delete/:id', (req, res, next) => {
    console.log(req.params.id);
    TagSkills.findByIdAndDelete(req.params.id)
        .then(succ => {
            res.status(200).json({message: 'Đã xóa tag kĩ năng thành công !'})
        })
        .catch(err => {
            res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
        });
});

router.post('/update', (req, res, next) => {

    var entity = req.body;

    TagSkills.findByIdAndUpdate(entity.id, entity.content)
        .then(succ => {
            res.status(200).json({message: 'Cập nhật tag kĩ năng thành công !', tagskill: succ})
        })
        .catch(err => {
            res.status(400).json({message: 'Đã xảy ra lỗi !' + err})
        });
});

module.exports = router;