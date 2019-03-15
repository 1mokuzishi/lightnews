const express = require('express')
const router = express.Router()
const News = require('../models/news')
const HotSearchList = require('../models/hotSearchList')
const User = require('../models/user')

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


router.post('/user/login', (req, res) => {
    let user = req.body;
    User.getUserByPhone(user.phone)
        .then(result=>{
            if(result[0].password === user.password){
               res.send('success!')
            }else{
                res.send("密码错误。")
            }
        }).catch((err)=>{
            res.send("用户不存在。")
         })
})
router.get('/user',(req,res)=>{
    res.send('111')
})

module.exports = router
