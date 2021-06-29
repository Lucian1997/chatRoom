const dbServer = require('../dao/dbServer')

//详情
exports.userDeatil = function (req, res) {
  let id = req.body.id
  dbServer.userDetail(id, res)
}

//用户信息修改
exports.userUpdate = function (req, res) {
  let data = req.body
  dbServer.userUpdate(data, res)
}

//获取好友昵称
exports.getNickname = function (req, res) {
  let data = req.body
  dbServer.getNickname(data, res)
}

//修改好友昵称
exports.setNickname = function (req, res) {
  let data = req.body
  dbServer.setNickname(data, res)
}