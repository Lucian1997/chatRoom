const express = require('express');
const router = express.Router();
const friend = require('../server/friend')

//申请好友
router.post('/apply', (req, res) => {
  friend.applyFriend(req, res)
})

//申请状态修改
router.post('/updateState', (req, res) => {
  friend.updateFriendState(req, res)
})

//拒绝或删除好友
router.post('/delete', (req, res) => {
  friend.deleteFriend(req, res)
})

module.exports = router;