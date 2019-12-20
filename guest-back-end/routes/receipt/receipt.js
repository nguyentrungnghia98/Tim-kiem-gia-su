var express = require('express');
var router = express.Router();
const CheckUser = require('../../middlewares/checkUser');
const ChecksumToken = require('../../utils/checksumToken');
const Receipt = require('../../models/receipt');

// Xử lí request lấy danh sách biên lai trong 1 khoảng time và điều kiện truyền lên
// POST /receipt/getListByTimeScope
router.post('/getListByTimeScope', CheckUser.blockIfIsStudent, (req, res) => {
    const { checksumToken, timestamp, condition, from, to, skill } = req.body;
    const isValid = ChecksumToken.verifyToken(checksumToken, timestamp);
    
    if (!isValid) {
        return res.status(400).json({message: 'checksumToken không hợp lệ'});
    }

    Receipt.getListByTimeScope(condition, from, to, skill)
        .then((rs) => res.status(200).json({
            results: {
                object: {
                    ...rs
                }
            }
        }))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

module.exports = router;