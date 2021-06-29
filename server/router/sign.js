const express = require('express');
const router = express.Router();
const sign = require('../server/sign')
//引入邮箱发送文件
const mailServer = require('../utils/mail')

//注册页
//注册
router.post('/signUp', (req, res) => {
  sign.signUp(req,res)
})

//用户或邮箱是否占用判断
router.post('/judge', (req, res) => {
  sign.judgeValue(req,res)
})

//登录页
//登录
router.post('/signIn', (req, res) => {
  sign.signIn(req, res)
})
//token测试
router.post('/testToken', (req, res) => {
  sign.testToken(req, res)
})

module.exports = router;