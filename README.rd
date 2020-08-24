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

