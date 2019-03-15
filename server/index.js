const express = require('express')
const bodyParser = require('body-parser')
const winston = require('winston')
const expressWinston = require('express-winston')
const cors = require('cors')

const apiRouter = require('./router/api')


var app = express()

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
}));



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
app.use('/api',apiRouter)
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
