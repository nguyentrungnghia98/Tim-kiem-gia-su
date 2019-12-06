const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSkillSchema = Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
        required: true,
        default: '/img/category.png'
    }
});

const TagSkill = mongoose.model('TagSkill', tagSkillSchema);

module.exports = {
    addTagSkill: (entity) => {
        const tagSkill = new TagSkill({
            content: entity.content,
            avatar: entity.avatar
        });

        return tagSkill.save();
    }
}