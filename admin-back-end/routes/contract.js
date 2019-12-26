const express = require('express');
const router = express.Router();

const Contract = require('../models/contract');


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

router.post('/update', (req, res, next) => {

    var entity = req.body;
    console.log(entity);

    Contract.findByIdAndUpdate(entity.id, entity.status)
        .then(succ => {
            res.status(200).json({message: 'Thay đổi trạng thái hợp đồng thành công !'})
        })
        .catch(err => {
            res.status(400).json({err: 'Đã xảy ra lỗi !' + err})
        });
});

module.exports = router;
