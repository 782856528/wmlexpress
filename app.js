const express = require('express')
const app = express()
// 解析application/json格式的内置中间件
app.use(express.json())
// 解析application/x-www-form-urlencoded格式数据的内置中间件
app.use(express.urlencoded({extended:false}))
// 中间件创建
//全局生效的中间件
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.result = {
        data:null,
        message:'',
        code:''
    }
 	next()
})
const userRouter = require ("./router/user")
const commonRouter = require ("./router/common")
// 2.创建 web 服务器
// 3.调用 app.listen(端口号， 启动成功后的回调函数)，启动服务器
// 监听GET请求

app.get('/',(req,res)=>{
    // console.log(req.query)获取query
    res.send('123456')
})
// 获取params
app.get('/a/:id',(req,res)=>{
    // console.log(req.params) 获取params
    res.send('123456')
})
// 监听post请求
app.get('/p',(req,res)=>{
    res.send('123456')
})
// 托管静态资源
// app.use(express.static('public'))
// 挂载路径前缀  必须带/
app.use('/public',express.static('public'))


// 模块化路由
app.use('/api',userRouter)
app.use('/api',commonRouter)
  //错误级别中间件,必须注册在所有路由之后 必须有 4 个形参 (err, req, res, next)
  app.use((err, req, res, next) => {
    console.log("发生了错误" + err.message)
    res.send('home page' + err.message)
  })
app.listen(80, () => {
    console.log('服务器已启动(地址：http://127.0.0.1)')
})