var express = require('express');
var router = express.Router();
const Receipt = require('../models/receipt');

// Xử lí request lấy danh sách biên lai trong 1 khoảng time và điều kiện truyền lên
// POST /receipt/getListByTimeScope
router.post('/getListByTimeScope', (req, res) => {
    const {condition, from, to, skill } = req.body;
    
    Receipt.getDataForStatistic(condition, from, to, skill)
        .then((rs) => {
            const temp = {};
            rs.forEach((doc) => {
                const key = `${doc.x.getDate()}/${doc.x.getMonth() + 1}/${doc.x.getFullYear()}`;
                if (temp[key]) {
                    temp[key] += doc.y;
                } else {
                    temp[key] = doc.y;
                }
            });
            const arrObj = [];
            for (var i in temp) {
                arrObj.push({
                    x: i,
                    y: temp[i]
                });
            }
            return res.status(200).json({
                data:  arrObj
                
            });
        })
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

router.post('/getTopTeacherIncome', (req, res) => {
    
    const {startDate} = req.body;
    Receipt.getTopTeacherIncome(startDate)
        .then((rs) => {
            return res.status(200).json({
                data:  rs               
            });
        })
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

router.post('/getTopSkillIncome', (req, res) => {
    
    const {startDate} = req.body;
    Receipt.getTopSkillIncome(startDate)
        .then((rs) => {
            return res.status(200).json({
                data:  rs               
            });
        })
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

module.exports = router;