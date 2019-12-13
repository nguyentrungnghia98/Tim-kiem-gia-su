const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  }
});

const Contract = mongoose.model("Contract", ContractSchema);

module.exports = {
    create: (idStudent, entity) => {
        const contract = new Contract({
            student: idStudent,
            teacher: entity.teacher,
            name: entity.name,
            feePerHour: entity.feePerHour,
            numberOfHour: entity.numberOfHour,
            describe: entity.describe
        });

        return contract.save();
    },

    getOneById: (id) => {
        return Contract.findOne({_id: id})
            .populate('student', '-password -contracts -contacts -major -__v')
            .populate('teacher', '-password -contracts -contacts -major -__v')
            .exec();
    },

    updateById: (id, properties) => {
        return Contract.updateOne({_id: id}, properties).exec;
    }
}
