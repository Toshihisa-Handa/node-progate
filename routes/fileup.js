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


//fileuploadのpostを受け取る記述
//postの場合も下のルーティングを'/fileup'→'/'へ変更する必要あるみたい
router.post('/',(req,res)=>{
    if(req.files){
        console.log(req.files)
        const file = req.files.file;//req.file.〇〇の部分はindex.htmlのinputタグのname属性と同じにする。
        console.log('hoge');
        //ここ(filename)でpostしたファイルの名前を指定している。
        const filename =Date.now() + '-' + Math.round(Math.random() * 1E9)+file.name;
        console.log(filename);
  
        connection.query('INSERT INTO images (images) VALUES(?)',[filename],(error,results)=>{
         if(error){
           res.send(error)
         }else{
  
          //ここの記述でuploadsフォルダにpostした画像を格納している。
          file.mv('./uploads/'+filename,(error)=>{
            if(error){
                res.send(error)
            }else{
                // res.send("File Uploaded")
                res.redirect('/fileup')
            }
        }); 
      };
    });
   };
  });


module.exports = router;
