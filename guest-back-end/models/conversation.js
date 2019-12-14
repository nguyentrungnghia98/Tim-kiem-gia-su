const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const ConversationSchema = new Schema({
  userOne: {
    type: Schema.Types.ObjectId, 
    ref:'User',
    required: true
  },
  userTwo: {
    type: Schema.Types.ObjectId, 
    ref:'User',
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
  messages: [
    {
      content: {
        type: String,
        required: true
      },
      sendBy: {
        type: Schema.Types.ObjectId,
        required: true
      },

      createAt: {
        type: Date,
        required: true
      }
    }
  ]
});

ConversationSchema.index({ 
  "userOne": 1,
  "userTwo": 1,
  "name": 1
});
ConversationSchema.plugin(mongoosePaginate);
const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = {
  sendMessage: (idSender, idReciever, message) => {
    const time = new Date();
    const update = {
      $push: {
        messages: {
          $each: [{
            content: message.trim(),
            sendBy: idSender,
            createAt: time,
          }],
          $position: 0
        }
      },
      $set: { 
        haveNewMessageAt: time,
        newestMessage: message.trim(),
        readNewestMessage: false
      },
      $setOnInsert: {
        userOne: idSender,
        userTwo: idReciever,
        name: `${idSender} ${idReciever}`,
      }
    };

    return Conversation.findOneAndUpdate({
      $or: [
        {
          name: `${idSender} ${idReciever}`
        },
        {
          name: `${idReciever} ${idSender}`
        }
      ]
    }, update, { upsert: true, new: true }).exec();
  },

  getListConversationsOfUser: (idUser, page, limit, sort) => {
    const query = { 
      $or: [
        {
          userOne: idUser
        },
        {
          userTwo: idUser
        }
      ]
    };

    const option = {
      page, limit,
      select: '-messages -__v',
      populate: [
          {
              path: 'userOne',
              select: '-password -contacts -contracts -major -__v'
          },
          {
              path: 'userTwo',
              select: '-password -contacts -contracts -major -__v'
          }
      ]
    };

    if (sort) {
      const temp = {};
      temp[sort.field] = sort.type;
      option.sort = temp;
    } else {
      option.sort = { haveNewMessageAt: -1 }
    }

    return Conversation.paginate(query, option);
  },

  getListMessagesOfConversation: (idConversation, idUser, page, limit) => {
    return Conversation.findOne({
      _id: idConversation,
      $or: [
        {
          userOne: idUser
        },
        {
          uerTwo: idUser
        }
      ]
    }).slice('messages', [((page - 1) * limit), limit])
    .populate('userOne', '-password -contacts -contracts -major -__v')
    .populate('userTwo', '-password -contacts -contracts -major -__v')
    .exec();
  },

  setNewMessageIsRead: (idConversation, idUser) => {
    Conversation.updateOne({
      _id: idConversation,
      $or: [
        {
          userOne: idUser
        },
        {
          uerTwo: idUser
        }
      ]
    }, { $set: { readNewestMessage: true } }).exec();
  }
};