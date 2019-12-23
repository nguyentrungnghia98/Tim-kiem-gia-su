const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    feePerHour: {
        type: Number,
        required: true,
    },
    numberOfHour: {
        type: Number,
        required: true,
    },
    totalPrice: {type: Number, default:0},
    describe: {
        type: String,
        maxlength: 500,
    },
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
    status: {
        type: String,
        enum: ['pending', 'denied', 'processing', 'processing_complaint',
          'complainted', 'finished'],
        required: true,
        default: 'pending'
    },
    createTime: {
        type: Date,
        required: true
    }
});

const Contract = mongoose.model('Contracts', ContractSchema);

module.exports = {

    countSumContracts: (status) => {
        return new Promise((resolve, reject) => {
            Contract.countDocuments({
                status: status,
            })
                .exec((err, succ) => {
                    if (err)
                        reject(err);
                    else
                        resolve(succ);
                })
        })
    },

    getListContracts: (status, limit, offset) => {
        return new Promise((resolve, reject) => {

            Contract.find({
                status: status
            },
            ['_id','status','name','teacher','student','feePerHour','numberOfHour','describe','createTime','totalPrice'],
            {
                skip: offset,
                limit: limit,
                sort: {
                    createTime: -1
                }
            })
            .populate('teacher', 'username')
            .populate('student', 'username')
            .exec((err, succ) => {
                if(err)
                    reject(err);
                else
                    resolve(succ);
            })
        })
    },
    findByIdAndUpdate: (id, status) => {
        return new Promise((resolve, reject) => {
            Contract.findByIdAndUpdate(id, {
                $set: {
                    status: status
                }
            }).exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },
}