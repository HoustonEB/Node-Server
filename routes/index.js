/*
* express.Router提供一个模块化的可安装化的router中间件*/
var express = require('express');
var router = express.Router();

// 向这个路由添加一个日志中间件
router.use(function timeLod(req, res, next) {
  console.log('time: ', Date.now());
  next();
});
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('首页');
  res.end()
});

module.exports = router;
