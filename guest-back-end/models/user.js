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
    introduction: { type: String },
    address: { type: String }
});


const User = mongoose.model('User', userSchema);

module.exports= {
    registerAccount: (entity, passwordHash) => {
        const user = new User({
            email: entity.email,
            password: passwordHash,
            username: entity.username,
            role: entity.role,
        });

        return user.save();
    },

    findOneByEmail: (email) => {
        return User.findOne({email}).populate('major', 'content').exec();
    },

    findOneAccountActiveByEmail: (email) => {
        return User.findOne({email, status: 'active' }).populate('major', 'content').populate().exec();
    },

    findOneById: (id) => {
        return User.findById(id).populate('major', 'content').exec();
    },

    updateOne: (conditionObject, properies) => {
        return User.updateOne(conditionObject, {$set: properies}).exec();
    },

    deleteOne: (conditionObject) => {
        return User.deleteOne(conditionObject).exec();
    },

    registerSocialAccount: (entity) => {
        const user = new User({
            username: entity.username,
            email: entity.email,
            status: 'active',
            role: -1,
        });

        return user.save();
    }
}