// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()
const sha1 = require("sha1")
//路由级别的中间件
router.use((req,res,next)=>{
	req.a  = 10
	next()
})
router.get('/user/token', function (req, res, next) {
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
      timestamp = req.query.timestamp,//时间戳
      nonce = req.query.nonce,//随机数
      echostr = req.query.echostr;//随机字符串
  
    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = ['123456', timestamp, nonce];
    array.sort();
  
    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    var resultCode = sha1(tempStr); //对传入的字符串进行加密
  
    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
      res.send(echostr);
    } else {
      res.send('mismatch');
    }
  });
// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {
  res.send('Add new user.')
})

// 4. 向外导出路由对象
module.exports = router