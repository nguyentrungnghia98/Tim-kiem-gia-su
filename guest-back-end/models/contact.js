const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user:{type: Schema.Types.ObjectId, ref:'User'},
  messages: [
    {
      content: {
        type: String
      },
      from: {
        type: Schema.Types.ObjectId, ref:'User'
      },
      createAt: {
        type: Date, default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Contact", ContactSchema);
