const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = Schema({

    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    contract: {
        type: Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    },

    // Danh sách kỹ năng của GV
    skill: [{
        type: Schema.Types.ObjectId,
        ref: 'TagSkill'
    }],

    // Trạng thái của biên lai
    status: {
        type: String,
        enum: ['available', 'terminated'],
        default: 'available'
    },

    // Ngày thanh toán
    x: {
        type: Date,
        required: true,
    },

    // Số tiền thanh toán
    y: {
        type: Number,
        required: true
    }
});

receiptSchema.index({skill: 1, teacher: 1, student: 1, x: 1});
const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = {

    getDataForStatistic: (condition, from, to, skill) => {
        const query = { 
            ...condition,
            x: {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        };

        if (skill != null && skill.length != 0) {
            query.skill = { $in: skill };
        }
        
        return Receipt.find(query).sort({x: 1}).select('x y').exec();
    },

    
    getTopTeacherIncome: (startDate) => {
        return Receipt.aggregate([
            
            {$match: { x: { $gte: new Date(startDate) } } },
            {"$group" : {_id: "$teacher", count: {$sum: "$y"} }},
            {$sort: {"count": -1}},
            {
                $lookup:
           {
             from: "users",
             localField: "_id",
             foreignField: "_id",
             as: "infoUser"
           }
          
    },
    {$project: {
        "_id" : 1,
        "count": 1,
        "infoUser.username": 1,
        "infoUser.email": 1,
        "infoUser.salaryPerHour": 1
    }}
        ]).exec();
    },

    getTopSkillIncome: (startDate) => {
        return Receipt.aggregate([
            {$match: { x : { $gte: new Date(startDate) } } },
            {$unwind: "$skill" },
            {$group : {_id: "$skill", count: {$sum: "$y"} }},
            {$sort: {"count": -1}},
            {$lookup: {from: 'tagskills',localField: '_id' , foreignField: '_id', as:'tagSkill'}}, 
            {$project: {
                "_id" : 1,
                "count": 1,
                "tagSkill.content": 1,
                "tagSkill.numOfTeacher": 1,
            }}   
        ])
        .exec();
    }
}