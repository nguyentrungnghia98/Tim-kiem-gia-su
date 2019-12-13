var express = require('express');
var router = express.Router();
const CheckUser = require('../../middlewares/checkUser');
const Contract = require('../../models/contract');
const User = require('../../models/user');

// Xử lí req lấy hợp đồng theo id
// GET /contract/:id
router.get('/:id', (req, res) => {
    Contract.getOneById(req.params.id)
        .then((contract) => res.status(200).json({
            results: {
                object: {
                    ...contract._doc
                }
            }
        }))
        .catch(() => res.status(500).json({message: "Lỗi không xác định được. Thử lại sau"}));
});


// Xử lí req tạo hợp đồng
// POST /contract/create
router.post('/create', CheckUser.passIfIsStudent, async (req, res) => {
    try {
        const contract = await Contract.create(req.userInfo.id, req.body);
        await Promise.all([User.addContract(req.userInfo.id, contract.id),
            User.addContract(contract.teacher, contract.id)]);
        res.status(200).json({message: "Tạo hợp đồng thành công"});
    } catch (err) {
        res.status(500).json({message: "Lỗi không xác định được. Thử lại sau"});
    }
});

module.exports = router;