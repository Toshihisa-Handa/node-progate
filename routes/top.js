var express = require('express');
var router = express.Router();

router.get('/',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('top.ejs');
});

module.exports = router;
