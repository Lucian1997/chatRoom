const express = require('express');
const router = express.Router();
const search = require('../server/search')

//搜索页面
//搜索用户
router.post('/user', (req, res) => {
  search.searchUser(req, res)
})
//判断是否为好友
router.post('/isfriend', (req, res) => {
  search.isFriend(req, res)
})
//搜索群组
router.post('/group', (req, res) => {
  search.searchGroup(req, res)
})
//判断是否在群内
router.post('/isingroup', (req, res) => {
  search.isInGroup(req, res)
})


module.exports = router;