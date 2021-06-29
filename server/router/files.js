const express = require('express');
const router = express.Router();
//引入文件上传插件
const multer = require('multer')
const mkdir = require('../utils/mkdir')

//控制文件的存储
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = req.body.url
    mkdir.mkdirs('../data/' + url, err => {
      if (err) {
        console.log(err);
      }
    })
    cb(null, `./data/${url}`)
  },
  filename: function (req, file, cb) {
    let name = req.body.name
    let type = file.originalname.replace(/.*\./, ".")
    cb(null, `${name}${type}`)
  }
})

let upload = multer({storage: storage})

router.post('/upload', upload.array('files', 10), (req, res, next) => {
  //路径
  let url = req.body.url
  //获取文件名
  let filename = req.files[0].filename
  let imgUrl = `/${url}/${filename}`
  res.send({status: 200, imgUrl: imgUrl})
})


module.exports = router;