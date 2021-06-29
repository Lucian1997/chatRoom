//引用发送邮件插件
const nodemailer = require('nodemailer')
//引入证书文件
const credentials = require('../config/credentials')

//创建传输方式
let transporter = nodemailer.createTransport({
  service: '163',
  auth: {
    user: credentials.email_163.user,
    pass: credentials.email_163.pass
  }
})

//注册发送邮件给用户
exports.emailSignUp = function (mail) {
  //发送信息内容
  let options = {
    from: '502031948@163.com',
    to: mail,
    subject: '感谢您在chatRoom注册',
    html:  '<span>chatRoom欢迎你的加入！</span><a href="http://localhost:3000">点击</a>'
  }

  //发送邮件的方式
  transporter.sendMail(options, (err, msg) => {
    if (err){
      console.log(err);
    }else {
      console.log('邮箱发送成功');
    }
  })
}