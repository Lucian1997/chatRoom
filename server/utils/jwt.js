//token
//引入token
let jwt = require('jsonwebtoken')
let secret = 'l_chatRoom'

//生成token
exports.generateToken = function (id) {
  let payload = {
    id: id,
    time: new Date()
  }
  let token = jwt.sign(payload, secret, {expiresIn: 60 * 60 * 24 * 120})
  return token
}

//解码token
exports.verifyToken = function (token) {
  let payload = {}
  jwt.verify(token, secret, function (err, result) {
    if (err) {
      payload = {
        status: false,
        result: null
      }
    }else {
      payload = {
        status: true,
        result: result
      }
    }
  })
  return payload
}