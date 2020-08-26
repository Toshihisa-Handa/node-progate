var express = require('express');
var router = express.Router();

//mysqlの準備
const mysql = require('mysql')

//DBの接続準備
const connection =
   mysql.createConnection({
      host:'localhost',
      user:'root',//mampではroot
      password:'',//mampでは空でOK
      database:'node_test_db'//任意のDB名
   });

router.get('/',(req, res)=>{
    connection.query('SELECT * FROM items',(error,results)=>{
        console.log(results);
        res.render('index.ejs',{items:results})
          //res.renderで指定ファイルの画面表示させる
    });
   });

module.exports = router;
