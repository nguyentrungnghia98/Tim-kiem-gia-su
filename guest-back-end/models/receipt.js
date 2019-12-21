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
    create: (entity) => {
        const receipt = new Receipt({
            student: entity.student,
            teacher: entity.teacher,
            contract: entity.contract,
            skill: entity.skill,
            x: new Date(),
            y: entity.amount
        });

        return receipt.save();
    },

    getListByTimeScope: (condition, from, to, skill) => {
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
  
        return Receipt.find(query).sort({x: 1}).select('-__v').exec();
    }
}