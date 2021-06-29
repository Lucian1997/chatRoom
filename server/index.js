const express = require('express')
//引入解析req.body插件
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//socket.io
let server = app.listen(8080)
let io = require('socket.io').listen(server)
require('./utils/socket')(io)
//跨域处理
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域//http://localhost:8080
  res.header("Access-Control-Allow-Origin","*")
  //允许的header类型
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Credentials", true)
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","*")
  res.header("X-Powered-By", "3.2.1")
  res.header("Content-Type", "application/json;charset=utf-8")
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next()
})

//中间件设置
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))

//获取静态路径
app.use(express.static(__dirname + '/data'))

//路由设置
require('./router/index')(app)

//404页面
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

//错误处理
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => {
  console.log(`chatRoom后端服务器已启动：http://localhost:${port}`);
})