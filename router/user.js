// 这是路由模块
// 1. 导入 express
const express = require('express')
// 引入jwt
const jwt = require('jsonwebtoken');
// 2. 创建路由对象
const router = express.Router()

const db = require('../db/index.js')
const secretKey = require('../utils/key.js')
// //路由级别的中间件
// router.use((req,res,next)=>{
// 	req.a = 10
// 	next()
// })
// // 3. 挂载具体的路由
// router.post('/user/add', (req, res) => {
//   console.log(req.body,res)
//   res.send('Add new user.')
// })


// 获取user
router.post('/user/list',(req,res) =>{
    // 查询用户 
    let sql = 'select name,sex,mobile,avatar from user'
    db.query(sql, (err, result) => {
        const token = req.headers.authorization;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
              return res.send({ message: 'token失效，请重新登录' });
            }
            return res.send({ state: 0, message: "查询成功", data: result });
          });
      });
})

// 添加user
router.post('/user/add',(req,res) =>{
    let name = req.body.name
    let sex = req.body.sex
    let mobile = req.body.mobile
    let avatar = req.body.avatar||null
    // 过滤用户
    let search = `select * from user where mobile='${mobile}'`
    // 添加用户 
   
    let sql = `insert into user (name,sex,mobile,avatar) values ('${name}',${sex},${mobile},${avatar});`
    db.query(search, (err, result) => {
        // 执行失败
        if (err) {
            return res.send({ state: 1, message: err });
        }
        if(result.length>0){
            return res.send({ state: 1, message: '用户已存在' });
        }else{
            db.query(sql, (err, result) => {
                // 执行失败
                if (err) {
                  return res.send({ state: 1, message: err });
                }
                //执行成功后返回，表中的数据
                return res.send({ state: 0, message: "添加成功", data: result });
              });
        }
    })
    
})

// 用户登录
// 添加user
router.post('/login',(req,res) =>{
    // 过滤用户
    let search = `select * from user where mobile='${req.body.mobile}' and pwd='${req.body.pwd}'`
    db.query(search, (err, result) => {
        // 执行失败
        if (err) {
            return res.send({ state: 1, message: err });
        }
        if(result.length>0){
           let token = jwt.sign({ name: result[0].name, id: result[0].id }, secretKey, { expiresIn: '1h' });
            res.send({
                data:{
                    ...result,
                    token:token,
                    msg:"登陆成功"
                }
            })
        }else{
            res.send({
                data:{
                    result:null,
                    token:null,
                    msg:"登陆失败"
                }
            })
        }
    })
})
// 4. 向外导出路由对象
module.exports = router