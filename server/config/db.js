const mongoose = require('mongoose')

let db = mongoose.createConnection('mongodb://localhost:27017/chatRoom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('chatRoom:连接数据库成功!');
})

module.exports = db