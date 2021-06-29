const dbServer = require('../dao/dbServer')
const jwt = require('../utils/jwt')
const _mail = require('../utils/mail')

//用户注册
exports.signUp = function (req, res) {
  let [username, password, mail] = [req.body.username, req.body.password, req.body.mail]
  _mail.emailSignUp(mail)
  dbServer.increaseUser(username, password, mail, res)
}

//用户或邮箱是否占用判断
exports.judgeValue = function (req, res) {
  let data = req.body.data
  let type = req.body.type
  dbServer.countUserValue(data, type, res)
}

//登录
exports.signIn = function (req, res) {
  let [data, password] = [req.body.data, req.body.password]
  dbServer.userMatch(data, password, res)
}

//测试token
exports.testToken = function (req, res) {
  let token = req.body.token
  let result = jwt.verifyToken(token)
  res.send(result)
}