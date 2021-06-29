const mongoose = require('mongoose')
const db = require('../config/db')

let Schema = mongoose.Schema

//用户表
let userSchema = new Schema({
  username: {type: String},                                   //用户名
  password: {type: String},                                   //密码
  mail: {type: String},                                       //邮箱
  sex: {type: String, default: 'asexual'},                    //性别
  birth: {type: Date},                                        //出生日期
  mobile: {type: String},                                     //手机
  explain: {type: String},                                    //介绍
  icon_url: {type: String, default: '/user/user.png'},              //头像
  create_time: {type: Date, default: new Date()}              //注册时间
})

//好友表
let friendSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},        //用户ID
  friend_id: {type: Schema.Types.ObjectId, ref: 'User'},      //好友ID
  nickname: {type: String},                                   //好友昵称
  state: {type: Number},                                      //好友状态(0:已为好友, 1:申请中, 2:申请发送方)
  last_time: {type: Date},                                    //最后通讯时间
  create_time: {type: Date, default: new Date()}              //创建时间
})

//一对一消息表
let messageSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},        //发送者ID
  friend_id: {type: Schema.Types.ObjectId, ref: 'User'},      //接受者ID
  message: {type: String},                                    //内容
  types: {type: Number},                                      //内容类型(0:文字, 1:图片链接, 2:音频链接)
  state: {type: Number, default: 1},                          //消息状态(0:已读, 1:未读)
  create_time: {type: Date, default: new Date()}              //发送时间
})

//群表
let groupSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},        //群主ID
  group_name: {type: String},                                 //群名称
  icon_url: {type: String, default: '/group/group.png'},             //群头像
  notice: {type: String},                                     //群公告
  create_time: {type: Date, default: new Date()}              //创建时间
})

//群成员表
let groupUserSchema = new Schema({
  group_id: {type: Schema.Types.ObjectId, ref: 'Group'},      //群ID
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},        //成员ID
  nickname: {type: String},                                   //群昵称
  tip: {type: Number, default: 0},                            //未读消息数
  shield: {type: Number, default: 0},                         //是否屏蔽(0:不屏蔽, 1:屏蔽)
  last_time: {type: Date},                                    //最后通讯时间
  create_time: {type: Date, default: new Date()}              //加入时间
})

//群消息表
let groupMsgSchema = new Schema({
  group_id: {type: Schema.Types.ObjectId, ref: 'Group'},      //群ID
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},        //成员ID
  message: {type: String},                                    //内容
  types: {type: Number},                                      //内容类型(0:文字, 1:图片链接, 2:音频链接)
  create_time: {type: Date, default: new Date()}              //发送时间
})

module.exports = db.model('User', userSchema)
module.exports = db.model('Friend', friendSchema)
module.exports = db.model('Message', messageSchema)
module.exports = db.model('Group', groupSchema)
module.exports = db.model('GroupUser', groupUserSchema)
module.exports = db.model('GroupMsg', groupMsgSchema)