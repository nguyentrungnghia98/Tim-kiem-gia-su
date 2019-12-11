const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSkillSchema = Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },

    // avatar: {
    //     type: String,
    //     required: true,
    //     default: '/img/category.png'
    // }
    numOfTeacher: {
        type: Number,
        default: 0
    }
});

const TagSkill = mongoose.model('TagSkill', tagSkillSchema);

module.exports = {

    findAll: () => {
        return new Promise((resolve, reject) => {
            TagSkill.find().exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    add: (entity) => {
        const tagSkill = new TagSkill({
            content: entity.content,
            //avatar: entity.avatar
        });

        return tagSkill.save();
    },

    findByIdAndDelete: (id) => {
        return new Promise((resolve, reject) => {
            TagSkill.findByIdAndDelete(id).exec((err, succ) => {
                if (err)
                    reject(err);
                else
                    resolve(succ);
            })
        });
    },

    findByIdAndUpdate: (id, content) => {
        return new Promise((resolve, reject) => {
            TagSkill.findByIdAndUpdate(id, {
                $set: {
                    content: content
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