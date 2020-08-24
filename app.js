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

   //データベース接続とデータベース作成
   connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
    
    //テーブル作成
   const sql = 'CREATE TABLE items (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)';
   connection.query(sql,(error,result)=>{
    if(error) throw error;
    console.log('table created')
   });
   

  });



//ルーティングを定義
app.get('/',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('top.ejs');
});

app.get('/index',(req, res)=>{
    //res.renderで指定ファイルの画面表示させる
    res.render('index.ejs');
});


//ポートの読み込み
app.listen(3001);