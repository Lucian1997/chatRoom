const dbModel = require('../model/dbModel')
const bcrypt = require('../utils/bcrypt')
//引入token文件
const jwt = require('../utils/jwt')
const User = dbModel.model('User')
const Friend = dbModel.model('Friend')
const Message = dbModel.model('Message')
const Group = dbModel.model('Group')
const GroupUser = dbModel.model('GroupUser')
const GroupMsg = dbModel.model('GroupMsg')

/**
 * @Description: 注册模块
 * @date: 2021/5/8 15:09
 */
//新建用户
exports.increaseUser = function (username, password, mail, res) {
  //密码加密
  let secretPwd = bcrypt.encryption(password)
  let data = {
    username: username,
    password: secretPwd,
    mail: mail
  }
  let user = new User(data)
  user.save((err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

//匹配用户表元素个数
exports.countUserValue = function (data, type, res) {
  let whereStr = {}
  whereStr[type] = data
  User.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

/**
 * @Description: 登录模块
 * @date: 2021/5/8 15:09
 */
//用户验证
exports.userMatch = function (data, pwd, res) {
  let whereStr = {
    $or: [
      {mail: data},
      {mobile: data}
    ]
  }
  let out = {
    username: 1,
    password: 1,
    icon_url: 1
  }
  User.find(whereStr, out, function (err, result) {
    if (err) {
      res.send({status: 500})
    } else {
      if (result.length === 0) {
        res.send({status: 405})
      } else {
        result.map((e) => {
          if (bcrypt.verification(pwd, e.password)) {
            let token = jwt.generateToken(e._id)
            let user = {
              id: e._id,
              username: e.username,
              icon_url: e.icon_url,
              token: token
            }
            res.send({status: 200, user})
          } else {
            res.send({status: 403})
          }
        })
      }
    }
  })
}

/**
 * @Description: 搜索模块
 * @date: 2021/5/8 15:09
 */
//搜索用户
exports.searchUser = function (data, res) {
  let whereStr = {}
  if (data === 'chatRoom') {
    whereStr = {}
  } else {
    whereStr = {
      $or: [
        {username: {$regex: data}},
        {mail: {$regex: data}},
        {mobile: {$regex: data}}
      ]
    }
  }
  let out = {
    username: 1,
    mail: 1,
    mobile: 1,
    icon_url: 1
  }
  User.find(whereStr, out, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

//判断是否为好友
exports.isFriend = function (uid, fid, res) {
  let whereStr = {
    user_id: uid,
    friend_id: fid,
    state: 0
  }
  Friend.findOne(whereStr, function (err, result) {
    if (err) {
      res.send({status: 500})
    } else {
      if (result) {
        //是好友
        res.send({status: 200})
      } else {
        //非好友
        res.send({status: 405})
      }
    }
  })
}

//搜索群
exports.searchGroup = function (data, res) {
  let whereStr = {}
  if (data === 'chatRoom') {
    whereStr = {}
  } else {
    whereStr = {
      group_name: {$regex: data}
    }
  }
  let out = {
    group_name: 1,
    icon_url: 1
  }
  Group.find(whereStr, out, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

//判断是否为在群内
exports.isInGroup = function (uid, gid, res) {
  let whereStr = {
    user_id: uid,
    group_id: gid
  }
  GroupUser.findOne(whereStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      if (result) {
        //群内
        res.send({status: 200})
      } else {
        //非群内
        res.send({status: 405})
      }
    }
  })
}

/**
 * @Description: 用户模块
 * @date: 2021/5/8 15:10
 */
//用户详情
exports.userDetail = function (id, res) {
  let whereStr = {
    _id: id
  }
  let out = {
    password: 0
  }
  User.findOne(whereStr, out, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

function updateUserById(id, update, res) {
  User.findByIdAndUpdate(id, update, (err, _result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
    return
  })
}

//用户信息修改
exports.userUpdate = function (data, res) {
  let updateStr = {}
  //判断是否有密码
  if (data.password != undefined) {
    User.find({_id: data.id}, {password: 1}, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        result.map(e => {
          const pwdMatch = bcrypt.verification(data.password, e.password)
          if (pwdMatch) {
            //密码验证成功
            if (data.type === 'password') {
              let newPwd = bcrypt.encryption(data.data)
              updateStr['password'] = newPwd
              updateUserById(data.id, updateStr, res)
            } else {
              updateStr[data.type] = data.data
              //匹配是否存在
              User.countDocuments(updateStr, (err, result) => {
                if (err) {
                  res.send({status: 500})
                } else {
                  if (result === 0) {
                    updateUserById(data.id, updateStr, res)
                  } else {
                    res.send({status: 403})
                  }
                }
              })
            }
          } else {
            res.send({status: 405})
          }
        })
      }
    })
  } else if (data.type === 'username') {
    updateStr['username'] = data.data
    User.countDocuments(updateStr, (err, result) => {
      if (err) {
        res.send({status: 500})
      } else {
        if (result === 0) {
          updateUserById(data.id, updateStr, res)
        } else {
          res.send({status: 403})
        }
      }
    })
  } else {
    updateStr[data.type] = data.data
    updateUserById(data.id, updateStr, res)
  }
}

//获取好友昵称
exports.getNickname = function (data, res) {
  let whereStr = {
    user_id: data.uid,
    friend_id: data.fid
  }
  let out = {
    nickname: 1
  }
  Friend.findOne(whereStr, out, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

//修改好友昵称
exports.setNickname = function (data, res) {
  let whereStr = {
    user_id: data.uid,
    friend_id: data.fid
  }
  let updateStr = {
    nickname: data.nickname
  }
  Friend.updateOne(whereStr, updateStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}


/**
 * @Description: 好友模块
 * @date: 2021/5/8 15:10
 */
//添加好友
exports.increaseFriend = function (uid, fid, state, res) {
  let data = {
    user_id: uid,
    friend_id: fid,
    state: state,
    last_time: new Date()
  }
  let friend = new Friend(data)
  friend.save((err, result) => {
    if (err) {
      console.log('添加好友失败');
    }
  })
}

//好友最后通讯时间
exports.updateFriendLastTime = function (data, res) {
  let whereStr = {
    $or: [
      {
        user_id: data.uid,
        friend_id: data.fid
      },
      {
        user_id: data.fid,
        friend_id: data.uid
      }
    ]
  }
  let updateStr = {
    last_time: new Date()
  }
  Friend.updateMany(whereStr, updateStr, (err, result) => {
    if (err) {
      console.log('更新通讯时间失败');
    }
  })
}

//添加一对一消息表
exports.increaseMessage = function (uid, fid, msg, type, res) {
  let data = {
    user_id: uid,
    friend_id: fid,
    message: msg,
    types: type,
    state: 1,
    create_time: new Date()
  }
  let message = new Message(data)
  message.save((err, result) => {
    if (res) {
      if (err) {
        res.send({status: 500})
      } else {
        res.send({status: 200})
      }
    }
  })
}
//好友申请
exports.applyFriend = function (data, res) {
  //判断是否已经申请过
  let whereStr = {
    user_id: data.uid,
    friend_id: data.fid
  }
  Friend.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      if (result === 0) {
        this.increaseFriend(data.uid, data.fid, 2)
        this.increaseFriend(data.fid, data.uid, 1)
      } else {
        this.updateFriendLastTime(data)
      }
      //添加消息
      this.increaseMessage(data.uid, data.fid, data.message, 0, res)
    }
  })
}

//更新好友状态
exports.updateFriendState = function (data, res) {
  //修改项
  let whereStr = {
    $or: [
      {
        user_id: data.uid,
        friend_id: data.fid
      },
      {
        user_id: data.fid,
        friend_id: data.uid
      }
    ]
  }
  Friend.updateMany(whereStr, {state: 0}, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

//拒绝或删除好友
exports.deleteFriend = function (data, res) {
  //修改项
  let whereStr = {
    $or: [
      {
        user_id: data.uid,
        friend_id: data.fid
      },
      {
        user_id: data.fid,
        friend_id: data.uid
      }
    ]
  }
  Friend.deleteMany(whereStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

/**
 * @Description: 首页模块
 * @date: 2021/5/17 16:14
 */
//按要求获取用户列表
exports.getFriend = function (data, res) {
  let query = Friend.find({})
  //查询条件
  query.where({user_id: data.uid, state: data.state})
  //friend_id
  query.populate('friend_id')
  //排序方式 最后通讯倒序
  query.sort({last_time: -1})
  //查询结果
  query.exec().then(e => {
    let result = e.map(item => {
      return {
        id: item.friend_id._id,
        name: item.friend_id.username,
        nickname: item.nickname,
        icon_url: item.friend_id.icon_url,
        last_time: item.last_time
      }
    })
    res.send({status: 200, result})
  }).catch(err => {
    res.send({status: 500})
  })
}

//获取最后一条一对一消息
exports.getLastMsg = function (data, res) {
  let query = Message.findOne({})
  //查询条件
  let whereStr = {
    $or: [
      {
        user_id: data.uid,
        friend_id: data.fid
      },
      {
        user_id: data.fid,
        friend_id: data.uid
      }
    ]
  }
  query.where(whereStr)
  //排序方式 最后通讯倒序
  query.sort({create_time: -1})
  //查询结果
  query.exec().then(e => {
    let result = {
      message: e.message,
      create_time: e.create_time,
      types: e.types
    }
    res.send({status: 200, result})
  }).catch(err => {
    res.send({status: 500})
  })
}

//获取一对一未读消息数
exports.unReadMsg = function (data, res) {
  let whereStr = {
    user_id: data.fid,
    friend_id: data.uid,
    state: 1
  }
  Message.countDocuments(whereStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

//一对一消息状态修改
exports.updateMsg = function (data, res) {
  let whereStr = {
    user_id: data.uid,
    friend_id: data.fid,
    state: 1
  }
  let updateStr = {state: 0}
  Message.updateMany(whereStr, updateStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

//获取群列表
exports.getGroup = function (data, res) {
  let query = GroupUser.find({})
  //查询条件
  query.where({user_id: data.uid})
  //查找groud_id关联的user对象
  query.populate('groud_id')
  //排序方式 最后通讯倒序
  query.sort({last_time: -1})
  //查询结果
  query.exec().then(e => {
    let result = e.map(item => {
      return {
        id: item.groud_id._id,
        group_name: item.groud_id.group_name,
        nickname: item.nickname,
        icon_url: item.groud_id.icon_url,
        last_time: item.last_time,
        tip: item.tip
      }
    })
    res.send({status: 200, result})
  }).catch(err => {
    res.send({status: 500})
  })
}

//获取最后一条群消息
exports.getGroupLastMsg = function (data, res) {
  let query = GroupMsg.findOne({})
  //查询条件
  query.where({group_id: data.gid})
  //查找user_id关联的user对象
  query.populate('user_id')
  //排序方式 最后通讯倒序
  query.sort({create_time: -1})
  //查询结果
  query.exec().then(e => {
    let result = {
      message: e.message,
      create_time: e.create_time,
      types: e.types,
      username: e.user_id.username
    }
    res.send({status: 200, result})
  }).catch(err => {
    res.send({status: 500})
  })
}

//群消息状态修改
exports.updateGroupMsg = function (data, res) {
  let whereStr = {
    group_id: data.gid,
    user_id: data.uid
  }
  let updateStr = {tip: 0}
  GroupUser.updateOne(whereStr, updateStr, (err, result) => {
    if (err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

/**
 * @Description: 聊天模块
 * @date: 2021/6/23 9:57
*/
//分页获取一对一聊天数据
exports.getChatMsg = function (data, res) {
  let skipNum = data.currentPage * data.pageSize
  let query = Message.find({})
  //查询条件
  //查询条件
  let whereStr = {
    $or: [
      {
        user_id: data.uid,
        friend_id: data.fid
      },
      {
        user_id: data.fid,
        friend_id: data.uid
      }
    ]
  }
  query.where(whereStr)
  //排序方式 最后通讯倒序
  query.sort({create_time: -1})
  //查找user_id关联的user对象
  query.populate('user_id')
  //分页
  query.skip(skipNum)
  query.limit(parseInt(data.pageSize))
  //查询结果
  query.exec().then(e => {
    let result = e.map(item => {
      return {
        id: item._id,
        from_id: item.user_id._id,
        message: item.message,
        types: item.types,
        icon_url: item.user_id.icon_url,
        time: item.create_time
      }
    })
    res.send({status: 200, result})
  }).catch(err => {
    console.log(err);
    res.send({status: 500})
  })
}





