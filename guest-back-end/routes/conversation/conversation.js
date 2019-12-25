var express = require('express');
var router = express.Router();
const ChecksumToken = require('../../utils/checksumToken');
const User = require('../../models/user');
const Conversation = require('../../models/conversation');
const CheckUser = require('../../middlewares/checkUser');

// Xử lí req send tin nhắn
// POST conversation/sendMessage
router.post('/sendMessage', CheckUser.passIfHaveValidToken, (req, res) => {
    Conversation.sendMessage(req.userInfo.id, req.body.id, req.body.message)
        .then(() => res.status(200).json({message: 'Gửi tin nhắn thành công'}))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

// Xử lí req lấy danh sách cuộc hội thoại của user
// POST /conversation/getListConversation
router.post('/getListConversation', CheckUser.passIfHaveValidToken, (req, res) => {
    const { page, limit, sort, condition } = req.body;
    Conversation.getListConversationsOfUser(req.userInfo.id, page, limit, sort, condition)
        .then((rs) => res.status(200).json({
            results: {
                object: {
                    ...rs
                }
            }
        }))
        .catch(() => res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'}));
});

// Xử lí req lấy danh sách tin nhắn của 1 cuộc thoại thoại của user
// POST /conversation/getListMessages
router.post('/getListMessages', CheckUser.passIfHaveValidToken, async (req, res) => {
    const { id, page, limit } = req.body;

    try {
        const rs = await Promise.all([Conversation.getListMessagesOfConversation(id, req.userInfo.id, page, limit),
            Conversation.setNewMessageIsRead(id, req.userInfo.id)]);

        res.status(200).json({
            results: {
                object: {
                    ...rs[0]._doc,
                    nextPage: page + 1,
                    limit,
                    messages: rs[0]._doc.messages.reverse()
                }
            }
        });
    } catch (err) {
        console.log('err',err)
        res.status(500).json({message: 'Lỗi không xác định được. Thử lại sau'});
    }
});

// Xử lí req lấy danh sách tin nhắn của 1 cuộc thoại theo name của hội thoại
// POST /conversation/getListMessagesByName
router.post('/getListMessagesByTwoUser', (req, res) => {
    const { checksumToken, timestamp, userOne, userTwo, page, limit } = req.body;
    const isValid = ChecksumToken.verifyToken(checksumToken, timestamp);

    if (!isValid) {
        return res.status(400).json({message: 'checksumToken không hợp lệ'});
    }

    Conversation.getListMessagesByTwoUser(userOne, userTwo, page, limit)
        .then((rs) => {
            res.status(200).json({
                results: {
                    object: {
                        ...rs._doc,
                        nextPage: page + 1,
                        limit,
                        messages: rs._doc.messages.reverse()
                    }
                }
            });
        })
        .catch((err) => res.status(500).json({message: err.message}))
});

module.exports = router;