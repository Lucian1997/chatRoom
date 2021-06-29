const express = require('express');
const router = express.Router();
const user = require('../server/user')

//用户详情
//详情
router.post('/detail', (req, res) => {
  user.userDeatil(req, res)
})
//用户信息修改
router.post('/update', (req, res) => {
  user.userUpdate(req, res)
})
//获取好友昵称
router.post('/getNickname', (req, res) => {
  user.getNickname(req, res)
})
//修改好友昵称
router.post('/setNickname', (req, res) => {
  user.setNickname(req, res)
})

module.exports = router;