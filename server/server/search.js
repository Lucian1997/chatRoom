const dbServer = require('../dao/dbServer')

//用户搜索
exports.searchUser = function (req, res) {
  let data = req.body.data
  dbServer.searchUser(data, res)
}

//判断是否为好友
exports.isFriend = function (req, res) {
  let [uid, fid] = [req.body.uid, req.body.fid]
  dbServer.isFriend(uid, fid, res)
}

//群组搜索
exports.searchGroup = function (req, res) {
  let data = req.body.data
  dbServer.searchGroup(data, res)
}

//判断是否为在群内
exports.isInGroup = function (req, res) {
  let [uid, gid] = [req.body.uid, req.body.gid]
  dbServer.isInGroup(uid, gid, res)
}