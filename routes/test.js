var express = require('express');
var router = express.Router();

router.get('/test',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('test.ejs');
});

module.exports = router;
