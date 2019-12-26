const express = require('express');
const router = express.Router();

const Contract = require('../models/contract');
const User = require('../models/user');
const Receipt = require('../models/receipt');

router.get('/', function(req, res, next) {

    const limit = 10;
    var page = req.query.page;
    var sortBy = req.query.sortBy;
    
    if(page === undefined || page === ""){
        page = 0;
    }

    if(sortBy === undefined || sortBy === ""){
        sortBy = ['pending', 'denied', 'processing', 'processing_complaint',
        'complainted', 'finished', 'complaint_fail'];
    }

    Contract.getListContracts(sortBy, limit, limit*page)
    .then(contracts => {
        Contract.countSumContracts(sortBy)
        .then(numberOfContracts => {
            res.status(200).json({numberOfContracts, contracts});
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
        
    })
    .catch(err => {
        res.status(400).json({message: err})
    })

})

router.post('/update', async (req, res, next) => {
  var entity = req.body;
  const {status, id} = req.body;
 
  try {
    const result = await Contract.getOneById(entity.id);
    const contract = result._doc;
    const { numberOfHour, _id,
      student, teacher, feePerHour } = contract; 
    const idStudent = student._id, idTeacher = teacher._id, skill = teacher.major;
    console.log({idTeacher,idStudent,})
    if (status != null && status === 'finished') {
      console.log('increase', numberOfHour * feePerHour * 0.8)
      await Promise.all([Contract.findByIdAndUpdate(req.body.id, req.body),
      User.updateOne({
        _id: idTeacher
      }, {
        $inc: {
          numberOfStudent: 1,
          teachedHour: numberOfHour,
          money: numberOfHour * feePerHour * 0.8
        }
      }), Receipt.create({
        contract: _id,
        student: idStudent,
        teacher: idTeacher,
        skill: skill,
        amount: feePerHour * numberOfHour
      })]);
    } else if (status != null && (status === 'denied' || status === 'complainted')) {
      await Promise.all([Contract.findByIdAndUpdate(req.body.id, req.body),
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
      await Contract.findByIdAndUpdate(id, req.body);
    }

    res.status(200).json({message: 'Thay đổi trạng thái hợp đồng thành công !'})
    
  } catch (err) {
    console.log('err',err)
    res.status(400).json({err: 'Đã xảy ra lỗi !', error:err})
  }
    
});

module.exports = router;
