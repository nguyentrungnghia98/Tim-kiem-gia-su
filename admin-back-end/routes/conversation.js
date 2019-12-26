var express = require('express');
var router = express.Router();

const Conversation = require('../models/conversation');

// POST /conversation/getListMessagesByTwoUser
router.post('/getListMessagesByTwoUser', (req, res) => {
    const { userOne, userTwo, dateComplaint} = req.body;
    
    Conversation.getListMessagesByTwoUser(userOne, userTwo)
        .then((result) => {
            res.status(200).json({
                    messages: result.messages.filter(mess => mess.createAt > new Date(dateComplaint))         
            });
        })
        .catch((err) => res.status(500).json({err: err.message}))
});

module.exports = router;