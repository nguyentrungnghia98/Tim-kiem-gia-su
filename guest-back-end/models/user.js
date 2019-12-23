const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
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
    isOnline: Boolean,
    lastOnline: Date,
    salaryPerHour: {type: Number},
    major: [{
        type: Schema.Types.ObjectId,
        ref: 'TagSkill'
    }],
    job: { type: String },
    introduction: { type: String },
    address: { type: String },
    job: {type: String},
    numberOfStudent: Number,
    teachedHour: Number,
    money: {
        type: Number,
        required: true,
        default: 0
    }
}, { collation: {
    locale: 'vi',
    strength: 2,
    caseLevel: false
}});

userSchema.index({address: 'text', job: 1});
userSchema.plugin(mongoosePaginate);
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

    findOneByIdWidthPassword: (id) => {
      return User.findById(id).select('-contacts -__v').populate('major', '-__v').exec();
    },

    findOneById: (id) => {
        return User.findById(id).select('-password -contacts -__v').populate('major', '-__v').exec();
    },

    updateOne: (conditionObject, properies) => {
        return User.updateOne(conditionObject, properies).exec();
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
    },

    getListTeacherWithPagination: (page, limit, arrTagSkill, place, fee, sort, searchText) => {
        const query = {};
        query.role = 1;

        if (arrTagSkill && arrTagSkill.length > 0) {
            query.major = { $in: arrTagSkill };
        }

        if (place) {
            query['$text'] = {$search: `\"${place}\"`};
        }

        if (fee) {
            switch (fee.type) {
                case 'LESS': 
                    query.salaryPerHour = {$lt: fee.value };
                    break;
                case 'GREATER': 
                    query.salaryPerHour = {$gt: fee.value };
                    break;
                case 'FROM_TO': 
                    query.salaryPerHour = {$lte: fee.value2, $gte: fee.value1 };
                    break;
            }
        }

        const option = { 
            page, limit,
            select: '-password -contacts -__v',
            populate: {
                path: 'major',
                select: '-__v'
            }
        };

        if(searchText) {
            query['$or'] = [
                {
                    job: {
                        $regex: `${searchText}`,
                        $options: 'i'
                    }
                }, {
                    username: {
                        $regex: `${searchText}`,
                        $options: 'i'
                    }
                }
            ]
        }

        if (sort) {
            const temp = {};
            temp[sort.field] = sort.type;
            option.sort = temp;
        }

        return User.paginate(query, option);
    },

    incHourAndNumberOfStudent: (id, hours, student) => {
        return User.updateOne({_id: id}, {
            $inc: {
                numberOfStudent: student,
                teachedHour: hours
            }
        }).exec();
    }
}