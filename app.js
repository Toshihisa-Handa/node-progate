/////////////////////////////
//////////定数定義//////////////////////////////////

//expressの準備
const express = require('express');
const app = express();

//fileuploadの準備
const upload = require('express-fileupload')


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

/////////////////////////////
//////////useの定義//////////////////////////////////

//publicフォルダ内のcssや画像フォルダの読み取りを可能にする
app.use(express.static('public'));

//formからpostされた内容を取得可能にする（定型文）CRUDで使う部分
app.use(express.urlencoded({extended: false}));

//fileuploadの使用を可能にする
app.use(upload());

//uploadsフォルダの読み取りを可能にする
app.use(express.static('uploads'));


/////////////////////////////
//////////ルーティング定義//////////////////////////////////

var topRouter = require('./routes/top');
var testRouter = require('./routes/test');
var indexRouter = require('./routes/index');
var newRouter = require('./routes/new');
var fileupRouter = require('./routes/fileup');
app.use('/', topRouter);
app.use('/test', testRouter);
app.use('/index', indexRouter);
app.use('/new', newRouter);
app.use('/fileup', fileupRouter);



//GETのルーティング
//getでは画面の表示に関するルーティングを定義する

//編集画面へのルーティング(外部化失敗)
   app.get('/edit/:id',(req, res)=>{
     connection.query('SELECT * FROM items WHERE id = ?',[req.params.id],(error,results)=>{
      res.render('edit.ejs',{item:results[0]});
     });
});



//POSTのルーティング
//postではデータベースの変更処理をする

//登録のルーティング
app.post('/create',(req,res)=>{
  connection.query('INSERT INTO items (name) VALUES (?)',[req.body.itemName],(error,results)=>{
   
    //この文にSELECT文を書き、res.render('/index')をするとINSERTがブラウザリロード度に起こる為、redirectを設定する。
    res.redirect('/index');
  })
});


//削除のルーティング
app.post('/delete/:id',(req,res)=>{
  connection.query('DELETE FROM items WHERE id = ?',[req.params.id],(error,results)=>{
    res.redirect('/index');

  });

});

//編集画面から更新のルーティング
app.post('/update/:id',(req,res)=>{
  connection.query('UPDATE items SET name = ? WHERE id = ?',[req.body.itemName,req.params.id],(errror,results)=>{
    res.redirect('/index')
  });
});








/////////////////////////////
////////////ポートの読み込み//////////////////////////////////

app.listen(3001);