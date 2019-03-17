const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');


const News = require('../models/news')
const HotSearchList = require('../models/hotSearchList')
const User = require('../models/user')

router.use(function(req,res,next) {
    if (req.url === '/user') {
        //token可能存在post请求和get请求
        let token = req.body.token || req.query.token || req.headers.authorization;
        jwt.verify(token, 'jwtSecret',  (err, decoded)=> {
            if (err) {
                res.json({
                    message: 'token过期，请重新登录',
                    resultCode: '403'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        next();
    }
})
router.get('/news', (req, res) => {
   res.send('hello')
    res.end();
})

router.get('/news/:id', (req, res) => {
    News.getNewsById(req.params.id)
    .then(news => {
      res.send({data:news})
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/channel/:channel', (req, res) => {
    var count = req.query.count;
    var next_id = req.query['next_id'];
    if(next_id){
        News.getChunkNews(req.params.channel,next_id)
            .then(news => {
                res.send({data:news.slice(0,count)})
            })
            .catch(err => {
                res.send(err)
            })
    }else{
        News.getNewsByChannel(req.params.channel)
            .then(news => {
                res.send({data:news.slice(0,count)})
            })
            .catch(err => {
                res.send(err)
            })
    }
})

router.get('/search', (req, res) => {
    var keyword = req.query.keyword;
    HotSearchList.upsert(keyword).catch(err => {
        console.log(err)
    })
    News.getNewsByKey(keyword)
        .then(news => {
            res.send({data:news})
        })
        .catch(err => {
            res.send(err)
        })
})
router.get('/hotsearchlist', (req, res) => {
    HotSearchList.getHotSearchList()
        .then(hotSearchList=>{
            let len=hotSearchList.length;
            if(len<10){
                res.send({data:hotSearchList})
            }else{
                res.send({data:hotSearchList.slice(0,10)})
            }
        })
        .catch(err=>{
            res.send(err)
        })
})
router.post('/user/register', (req, res) => {
        let user = req.body;
        user.nickname = `user${user.phone.substr(0,8)}`;
        User.createUser(user)
            .then(result=>{
                res.send(result);
            }).catch(()=>{
            res.send("电话已被占用。")
        })
})

router.post('/authenticate', (req, res) => {
    let user = req.body;
    User.getUserByPhone(user.phone)
        .then(result=>{
            if(result[0].password === user.password){
                let token = jwt.sign(result[0].toJSON(),'jwtSecret', {
                    expiresIn : 60*60// 授权时效24小时
                });
                res.json({
                    success: true,
                    token: token
                });

            }else{
                res.send("密码错误。")
            }
        }).catch((err)=>{
            console.log(err)
        switch(err){
            case "Cannot read property 'password' of undefined" :
                res.send("用户不存在。");break;
        }

    })
})

router.get('/user',(req,res)=>{
    res.json({ message: req.decoded});
})

module.exports = router
