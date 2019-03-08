const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')
const routes = require('./router')

var app = express()

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [

    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))


app.listen(8000,function () {
  console.log('server is running at port 8000')
})
