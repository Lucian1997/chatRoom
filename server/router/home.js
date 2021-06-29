const express = require('express');
const router = express.Router();
const home = require('../server/home')

//获取好友
router.post('/getfriend', (req, res) => {
  home.getFriend(req, res)
})

//获取最后一条一对一消息
router.post('/getlastmsg', (req, res) => {
  home.getLastMsg(req, res)
})

//获取一对一未读消息数
router.post('/unreadmsg', (req, res) => {
  home.unReadMsg(req, res)
})

//一对一未读消息已读
router.post('/updatemsg', (req, res) => {
  home.updateMsg(req, res)
})

//获取群列表
router.post('/getgroup', (req, res) => {
  home.getGroup(req, res)
})

//获取最后一条群消息
router.post('/getgrouplastmsg', (req, res) => {
  home.getGroupLastMsg(req, res)
})

//群消息已读
router.post('/updategroupmsg', (req, res) => {
  home.updateGroupMsg(req, res)
})

module.exports = router;