/*
* express.Router提供一个模块化的可安装化的router中间件*/
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');

// 向这个路由添加一个日志中间件
router.use(function timeLod(req, res, next) {
  console.log('time: ', Date.now());
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin","*");
  //跨域允许的header类型
  res.setHeader("Access-Control-Allow-Headers","Content-type,Content-Length,Authorization,Accept,X-Requested-Width");
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //设置响应头信息
  res.setHeader("X-Powered-By",' 3.2.1')
  //让options请求快速返回
  if(req.method == "OPTIONS"){return res.end();}
  next();
});
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('首页');
  res.end()
});
router.get('/getRole', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(
    {
          data: {
              role: 'zhangsan'
          },
          status: 200,
          message: '姓名'
      }
  );
  res.end()
});
router.post('/getList', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.setHeader('access-control-allow-origin', '*')
  console.log(req.body, 'getList请求数据')
  res.send(
    {
      data: {
          list: [1,2,3]
      },
      status: 'need-login',
      message: '需要登录'
  }
  );
  res.end()
});
router.post('/getTable', function(req, res, next) {
  res.send(
    {
      data: {
          list: 'table'
      },
      status: '3000',
      message: '错误接口'
  }
  );
  res.end()
});
router.post('/upload', function(req, res, next) {
  console.log(req.body, 'upload-body')
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
  });
  res.send(
    {
      data: {
          files: req.body
      },
      status: '200',
      message: '上传成功'
  }
  );
  res.end()
});

module.exports = router;
