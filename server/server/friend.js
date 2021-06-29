const dbServer = require('../dao/dbServer')

//申请好友
exports.applyFriend = function (req, res) {
  let data = req.body
  dbServer.applyFriend(data, res)
}

//接收好友申请
exports.updateFriendState = function (req, res) {
  let data = req.body
  dbServer.updateFriendState(data, res)
}

//拒绝或删除好友
exports.deleteFriend = function (req, res) {
  let data = req.body
  dbServer.deleteFriend(data, res)
}