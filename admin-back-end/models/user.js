const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        minlength: 1,
        maxlength: 70
    },
    email: {
        type: String,
        required: true,
        maxlength: 60
    },
    password: { 
        type: String
    },
    avatar: { 
        type: String,
        default: 'img/user.png'
    },
    role: { 
        type: Number,
        default: 0
    },
    status: { 
        type: String,
        default: 'active'
    },
    salaryPerHour: {type: Number},
    major: [{
        type: Schema.Types.ObjectId,
        ref: 'TagSkill'
    }],
    job: { type: String },
    introduction: { type: String },
    address: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports= {
    
    findAll: () => {
        return new Promise((resolve, reject) => {
            User.find().exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findTeacher: () => {
        return new Promise((resolve, reject) => {
            User.find({role:1}, ['status','avatar', 'major', 'email','username', 'address','introduction','job','salaryPerHour'],)
            .populate('major', 'content')
            .exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findStudent: () => {
        return new Promise((resolve, reject) => {
            User.find({role:0}, ['status','avatar', 'major', 'email','username'])
            .populate('major', 'content')
            .exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findOneByEmail: (email) => {
        return User.findOne({email}).populate('major', 'content').exec();
    },

    findOneAccountActiveByEmail: (email) => {
        return User.findOne({email, status: 'active' }).populate('major', 'content').populate().exec();
    },

    findOneById: (id) => {
        return User.findById(id, ['status', 'role','avatar', 'major', 'email','username', 'address','introduction','job', 'salaryPerHour']).populate('major', 'content').exec();
    },

    updateOne: (conditionObject, properies) => {
        return User.updateOne(conditionObject, {$set: properies}).exec();
    },

    deleteOne: (conditionObject) => {
        return User.deleteOne(conditionObject).exec();
    },

}