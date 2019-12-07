var express = require('express');
var router = express.Router();
const jwt = require('../../utils/jwt');
const User = require('../../models/user');
const TagSkill = require('../../models/TagSkill');

// Xử lí req lấy danh sách tag skill
// GET tagSkill/getListTagSkill
router.get('/getListTagSkill', (req, res) => {
    TagSkill.getListTagSkill()
        .then((rs) => res.status(200).json({
            results: {
                objects: [
                    ...rs
                ]
            }
        }))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}))

});

module.exports = router;