const dbServer = require('../dao/dbServer')

//获取聊天信息
exports.getChatMsg = function (req, res) {
  let data = req.body
  dbServer.getChatMsg(data, res)
}