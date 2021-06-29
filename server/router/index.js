const jwt = require('../utils/jwt')
const signRouter = require('./sign')
const searchRouter = require('./search')
const userRouter = require('./user')
const friendRouter = require('./friend')
const filesRouter = require('./files')
const homeRouter = require('./home')
const chatRouter = require('./chat')

module.exports = function (app) {

  app.use('/sign', signRouter)

  app.use(function (req, res, next) {
    //处理token匹配
    let token = req.headers.authorization
    let result = jwt.verifyToken(token)
    if (result.status) {
      //通过验证
      next()
    }else {
      //token不合法
      res.send({status:401})
    }
  })
  app.use('/search', searchRouter)
  app.use('/user', userRouter)
  app.use('/friend', friendRouter)
  app.use('/files', filesRouter)
  app.use('/home', homeRouter)
  app.use('/chat', chatRouter)
}