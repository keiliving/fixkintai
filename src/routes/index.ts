import requestTopPage from '../handler';
import sendMessage from '../bolt';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {  // 変更箇所
  res.render('index', { title: 'Express' });
  requestTopPage()
  sendMessage()
});

module.exports = router;