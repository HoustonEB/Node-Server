var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.set({
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Content-Length': '123',
        // 'ETag': '12345'
    });
  res.send({userName: 'yuzhuang'});
});

module.exports = router;
