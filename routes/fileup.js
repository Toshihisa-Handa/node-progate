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

//画像投稿ページへのルーティング
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM images',(error,results)=>{
      console.log('hoge')
      console.log(results)
      res.render('fileup.ejs',{items:results})
    })
  })

//fileuploadのgetの記述
router.get('/fileup',(req, res)=>{
  connection.query('SELECT * FROM images',(error,results)=>{
    res.sendFile(__dirname +'/views/top.ejs')
  })
});

module.exports = router;
