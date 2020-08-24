//expressの準備
const express = require('express');
const app = express();

//mysqlの準備
const mysql = require('mysql')

//publicフォルダ内のcssや画像フォルダの読み取りを可能にする
app.use(express.static('public'));

//DBの接続準備
const connection =
   mysql.createConnection({
      host:'localhost',
      user:'root',//mampではroot
      password:'',//mampでは空でOK
      database:'node_test_db'//任意のDB名
   })



//ルーティングを定義
app.get('/',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('top.ejs');
});

app.get('/index',(req, res)=>{
   connection.query('SELECT * FROM items',(error,results)=>{
       console.log(results);
       res.render('index.ejs',{items:results})
         //res.renderで指定ファイルの画面表示させる
    res.render('index.ejs');
   });

   app.get('/new',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('new.ejs');
});

  
});


//ポートの読み込み
app.listen(3001);