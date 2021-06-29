const dbServer = require('../dao/dbServer')

module.exports = function(io) {
  let users = {}
  io.on('connection', socket => {
    //用户登录注册
    socket.on('login', id => {
      socket.emit('login', socket.id)
      socket.name = id
      users[id] = socket.id
    })
    //用户离开
    socket.on('disconnecting', () => {
      if (users.hasOwnProperty(socket.name)) {
        delete users[socket.name]
      }
    })
    //一对一聊天
    socket.on('msg', (msg, uid, fid) => {
      console.log(msg);
      dbServer.updateFriendLastTime({uid, fid})
      if (msg.types === 2 || msg.types === 3) {
        msg.message = JSON.stringify(msg.message)
      }
      dbServer.increaseMessage(uid, fid, msg.message, msg.types)
      if (users[fid]) {
        socket.to(users[fid]).emit('msg', msg, uid)
      }
    })
  })
}
