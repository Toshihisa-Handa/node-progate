

//expressの準備
const express = require('express');
const app = express();

//mysqlの準備
const mysql = require('mysql')

//publicフォルダ内のcssや画像フォルダの読み取りを可能にする
app.use(express.static('public'));

//formからpostされた内容を取得可能にする（定型文）
app.use(express.urlencoded({extended: false}));

//DBの接続準備
const connection =
   mysql.createConnection({
      host:'localhost',
      user:'root',//mampではroot
      password:'',//mampでは空でOK
      database:'node_test_db'//任意のDB名
   })


//GETのルーティング
//getでは画面の表示に関するルーティングを定義する
app.get('/',(req, res)=>{
    // res.renderで指定ファイルの画面表示させる
    res.render('top.ejs');
});


//res.render()だとINSERT文を使用した時にブラウザリロードで同じ内容が登録されてしまう為、redirectを使う
res.redirect('/index.ejs')












INSERT, SELECTなどを実行する際は
query()メソッドを使う

connection.query(sql文, (error,results)=>{

}



前提条件　以下でDB接続準備をする。
//DBの接続準備
const connection =
   mysql.createConnection({
      host:'localhost',
      user:'root',//mampではroot
      password:'',//mampでは空でOK
    //   database:'test'//任意のDB名
   })



     //データベース作成
    connection.query('CREATE DATABASE node_test_db',(error,results)=>{
        if(error) throw error;
        console.log('database created')
    }) 

    //テーブル作成
   const sql = 'CREATE TABLE items (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)';
   connection.query(sql,(error,result)=>{
    if(error) throw error;
    console.log('table created')
   });

