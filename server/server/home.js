const dbServer = require('../dao/dbServer')

//获取好友列表
exports.getFriend = function (req, res) {
  let data = req.body
  dbServer.getFriend(data, res)
}

//获取最后一条一对一消息
exports.getLastMsg = function (req, res) {
  let data = req.body
  dbServer.getLastMsg(data, res)
}

//获取一对一未读消息数
exports.unReadMsg = function (req, res) {
  let data = req.body
  dbServer.unReadMsg(data, res)
}

//一对一未读消息已读
exports.updateMsg = function (req, res) {
  let data = req.body
  dbServer.updateMsg(data, res)
}

//获取群列表
exports.getGroup = function (req, res) {
  let data = req.body
  dbServer.getGroup(data, res)
}

//获取最后一条群消息
exports.getGroupLastMsg = function (req, res) {
  let data = req.body
  dbServer.getGroupLastMsg(data, res)
}

//群消息已读
exports.updateGroupMsg = function (req, res) {
  let data = req.body
  dbServer.updateGroupMsg(data, res)
}