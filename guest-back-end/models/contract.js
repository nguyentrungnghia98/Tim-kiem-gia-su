const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
const User = require('./user');

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
      maxlength: 20,
      required: true,
      default: 'pending'
  },
  createTime: {
      type: Date,
      required: true
  }
});

ContractSchema.index({student: 1, teacher: 1});
ContractSchema.plugin(mongoosePaginate);

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = {
    create: (idStudent, entity) => {
        const contract = new Contract({
            student: idStudent,
            teacher: entity.teacher,
            name: entity.name,
            feePerHour: entity.feePerHour,
            numberOfHour: entity.numberOfHour,
            describe: entity.describe,
            createTime: new Date(),
            totalPrice: entity.feePerHour* entity.numberOfHour
        });

        return contract.save();
    },

    getOneById: (id) => {
        return Contract.findOne({_id: id})
            .populate('student', '-password -contracts -contacts -major -__v')
            .populate('teacher', '-password -contracts -contacts -major -__v')
            .exec();
    },

    updateById: (idUser, idContract, properties) => {
        return Contract.updateOne({
            _id: idContract,
            $or: [
                { student: idUser },
                { teacher: idUser }
            ]
        }, properties).exec();
    },

    getListContractOfUser: (idUser, role, page, limit, sort, condition) => {
        const query = { ...condition };

        if (role === 0) {
            query.student = idUser;
        } else if (role === 1) {
            query.teacher = idUser;
        }

        const option = {
            page, limit,
            populate: [
                {
                    path: 'student',
                    select: '-password -contacts -contracts -major -__v'
                },
                {
                    path: 'teacher',
                    select: '-password -contacts -contracts -major -__v'
                }
            ]
        }

        if (sort) {
            const temp = {};
            temp[sort.field] = sort.type;
            option.sort = temp;
        }

        return Contract.paginate(query, option);
    }
}
