var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {  // 変更箇所
  res.render('index', { title: 'xpress' });
});

router.get('/test', function(req: any, res: any, next: any) {  // 変更箇所
  res.render('debug', { res: "aab" });
  console.log(req.headers);
  console.log("aaa");
});

module.exports = router;