const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    userOne: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTwo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    haveNewMessageAt: Date,
    newestMessage: String,
    readNewestMessage: {
        type: Boolean,
        default: false,
    },
    messages: [{
        content: {
            type: String,
            required: true,
            maxlength: 300
        },
        sendBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        createAt: {
            type: Date,
            required: true
        }
    }]
});

const Conversation = mongoose.model('Conversations', ConversationSchema);

module.exports = {

    getListMessagesByTwoUser: (userOne, userTwo) => {
        //var date = new Date(dateComplaint)
        return new Promise((resolve, reject) => {
            Conversation.findOne({
                    userOne: userOne,
                    userTwo: userTwo,
                    //messages:  { $elemMatch: { createAt : {'$gte' : date}}}
                }, ['messages'])
                .populate('messages.sendBy', 'username')
                .exec((err, succ) => {
                    if (err)
                        reject(err);
                    else
                        resolve(succ);
                })
        })
    }
};