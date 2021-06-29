const express = require('express');
const router = express.Router();
const chat = require('../server/chat')

//获取聊天数据
router.post('/getmsg', (req, res) => {
  chat.getChatMsg(req, res)
})

module.exports = router;