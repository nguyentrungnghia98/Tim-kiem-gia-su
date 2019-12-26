var express = require('express');
var router = express.Router();
const CheckUser = require('../../middlewares/checkUser');
const stripe = require("stripe")("sk_test_u1KwHkCuj6A5ivGUQd3y1Jce");
const ChecksumToken = require('../../utils/checksumToken');
const Contract = require('../../models/contract');
const Receipt = require('../../models/receipt');
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
    const { tokenId, feePerHour, numberOfHour, checksumToken, timestamp } = req.body;
    const isValid = ChecksumToken.verifyToken(checksumToken, timestamp);

    if (!isValid) {
        return res.status(400).json({message: 'checksumToken không hợp lệ'});
    }

    if(!tokenId) res.status(500).json({message: "Thanh toán lỗi. Token is undefined"});

    let status;
    const amount = feePerHour * numberOfHour;

    try {
        const res = await stripe.charges.create({
            amount,
            currency: "vnd",
            description: "An example charge",
            source: tokenId
        });
        status = res.status;
    } catch(err) {
        return res.status(500).json({message: "Thanh toán thất bại"});
    }

    try {
        const contract = await Contract.create(req.userInfo.id, req.body);
        res.status(200).json({
            results: {
                object: {
                    ...contract._doc
                },
                status
            }
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Xử lí req update hợp đồng
// POST /contract/update
router.post('/update', CheckUser.passIfHaveValidToken, async (req, res) => {
    const { numberOfHour, checksumToken, timestamp, status, 
        id, idStudent, idTeacher, skill, feePerHour } = req.body; 
    const isValid = ChecksumToken.verifyToken(checksumToken, timestamp);

    if (!isValid) {
        return res.status(400).json({message: 'checksumToken không hợp lệ'});
    }

    try {
        if (status != null && status === 'finished') {
          console.log('increase', numberOfHour * feePerHour * 0.8)
            await Promise.all([Contract.updateById(req.body.id, req.body),
                User.updateOne({
                    _id: idTeacher
                }, {
                    $inc: {
                        numberOfStudent: 1,
                        teachedHour: numberOfHour,
                        money: numberOfHour * feePerHour * 0.8
                    }
                }), Receipt.create({
                    contract: id,
                    student: idStudent,
                    teacher: idTeacher,
                    skill: skill,
                    amount: feePerHour * numberOfHour
                })]);
        } else if (status != null && (status === 'denied' || status === 'complainted')) {
            await Promise.all([Contract.updateById(req.body.id, req.body),
                User.updateOne({
                    _id: idStudent,
                    role: 0
                }, {
                    $inc: {
                        money: (numberOfHour * feePerHour)
                    }
                })]);
        }
        else {
            await Contract.updateById(id, req.body);
        }

        res.status(200).json({
            results: {
                object: {
                    ...req.body
                }
            }
        })
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Xử lí req lấy danh sách hợp đồng
// POST /contract/getList
router.post('/getList', CheckUser.passIfHaveValidToken, (req, res) => {
    const { page, limit, sort, condition } = req.body;
    Contract.getListContractOfUser(req.userInfo.id, req.userInfo.role, page, limit, sort, condition)
        .then((rs) => res.status(200).json({
            results: {
                object: {
                    ...rs
                }
            }
        }))
        .catch((err) => res.status(500).json({message: err.message}));
});

// Xử lí req lấy danh sách hợp đồng có đánh giá của giáo viên
// POST /contract/getListReview
router.post('/getListReview', (req, res) => {
  const {id,role, page, limit, sort } = req.body;
  const condition = {
    status: 'finished'
  }
  Contract.getListContractOfUser(id, role, page, limit, sort, condition)
      .then((rs) => res.status(200).json({
          results: {
              object: {
                  ...rs
              }
          }
      }))
      .catch((err) => res.status(500).json({message: err.message}));
});
module.exports = router;