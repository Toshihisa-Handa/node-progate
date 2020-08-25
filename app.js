//expressの準備
const express = require('express');
const app = express();

//fileuploadの準備
const upload = require('express-fileupload')


//mysqlの準備
const mysql = require('mysql')

//publicフォルダ内のcssや画像フォルダの読み取りを可能にする
app.use(express.static('public'));

//formからpostされた内容を取得可能にする（定型文）CRUDで使う部分
app.use(express.urlencoded({extended: false}));

//fileuploadeの使用を可能にする
app.use(upload());


//DBの接続準備
const connection =
   mysql.createConnection({
      host:'localhost',
      user:'root',//mampではroot
      password:'',//mampでは空でOK
      database:'node_test_db'//任意のDB名
   })



//ルーティングを定義

//GETのルーティング
//getでは画面の表示に関するルーティングを定義する
app.get('/',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('top.ejs');
});

app.get('/index',(req, res)=>{
   connection.query('SELECT * FROM items',(error,results)=>{
       console.log(results);
       res.render('index.ejs',{items:results})
         //res.renderで指定ファイルの画面表示させる
   });

   app.get('/new',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('new.ejs');
});
});

//編集画面へのルーティング
   app.get('/edit/:id',(req, res)=>{
     connection.query('SELECT * FROM items WHERE id = ?',[req.params.id],(error,results)=>{
      res.render('edit.ejs',{item:results[0]});
     });

});

//画像投稿ページへのルーティング
  app.get('/fileup',(req,res)=>{
    
    res.render('fileup.ejs');
  })

//fileuploadのgetの記述
app.get('/fileup',(req, res)=>{
  res.sendFile(__dirname +'/views/top.ejs')
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

//fileuploadのpostを受け取る記述
app.post('/fileup',(req,res)=>{
  if(req.files){
      console.log(req.files)
      const file = req.files.file;//req.file.〇〇の部分はindex.htmlのinputタグのname属性と同じにする。
      console.log('hoge');
      const filename =file.name;
      console.log(filename);

      file.mv('./uploads/'+filename,(error)=>{
          if(error){
              res.send(error)
          }else{
              res.send("File Uploaded")
          }
      })
};
});

//ポートの読み込み
app.listen(3001);