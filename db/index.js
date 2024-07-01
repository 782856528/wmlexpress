
// 1、引入mysql
const mysql = require("mysql");
// 2、建立一个连接池
const db = mysql.createPool({
  host: "139.9.128.123", // 数据库的IP地址(本地的或者是云服务器的都可以)
  user: "root",//用户名
  password: "123456",
  database: "wml", //指定要操作哪个数据库
});
 
 
//  检测数据库是否连接成功
 db.query("select 1", (err, results) => {
   if (err) return console.log(err);
   console.log(results);
 });
 //如果能打印出[ RowDataPacket { '1': 1 } ]代表连接数据库成功
 
 
// 将文件暴露出去
module.exports = db