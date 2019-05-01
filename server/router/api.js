const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');


const News = require('../models/news')
const HotSearchList = require('../models/hotSearchList')
const User = require('../models/user')

router.use(function(req,res,next) {
    if (req.url === '/user'||req.url === '/modInfo') {
        //token可能存在post请求和get请求
        let token = req.headers.authorization;
        jwt.verify(token, 'jwtSecret',  (err, decoded)=> {
            if (err) {
                res.json({
                    message: 'token expired',
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
    let userId = req.headers.userid;
    let newsId = req.params.id
    News.getNewsById(newsId)
    .then(news => {
        res.send({data:news})
        let tags=news[0].tags?news[0].tags.split('_'):null
        if(tags!==null){
            User.addHistory(userId,tags)
                .then(()=>{
                    User.findUserById(userId).then(user=>{
                        let countedTags = user[0].history.reduce(function (allItems, item) {
                            if (item in allItems) {
                                allItems[item]++;
                            }
                            else {
                                allItems[item] = 1;
                            }
                            return allItems;
                        }, {});
                        User.updateKeyword(userId,countedTags).catch(err=>{console.log(err)})
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })

        }

    }).catch(err => {
      res.send(err)
    })
})
router.get('/hot_data', (req, res) => {
    let userId = req.headers.userid;
    User.findUserById(userId).then(user=>{
        var arr = []
        for (let i in user[0].keyword) {
            let o = {};
            o[i] = user[0].keyword[i];
            arr.push(o)
        }//排序，使关键词出现最多次的排前面
        arr.sort(function (a,b) {
            return Object.values(b)[0]-Object.values(a)[0];
        })
        let temp=arr.slice(0,10);
        let tagsArr = [];
        temp.map((item)=> {
            tagsArr.push(Object.keys(item)[0]);
        })
        News.getNewsByKeyword(tagsArr).then((news)=>{
            res.send(news.slice(0,20));
        }).catch(err=>console.log(err))




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
router.post('/register', (req, res) => {
        let user = req.body;
        user.nickname = `user${user.phone.substr(0,8)}`;
        User.createUser(user)
            .then(result=>{
                let tmp = {_id:result._id}
                let token = jwt.sign(tmp,'jwtSecret', {
                    expiresIn : 60*60*24// 授权时效24小时
                });
                res.json({
                    success: true,
                    token: token
                });
            }).catch((err)=>{
                if(err.errmsg.indexOf("duplicate" )>-1)
                    res.send("电话已被占用。");
            })
})

router.post('/authenticate', (req, res) => {
    let user = req.body;
    User.getUserByPhone(user.phone)
        .then(result=>{
            if(result[0].password === user.password){
                let tmp = {_id:result[0]._id.toString()}
                let token = jwt.sign(tmp,'jwtSecret', {
                    expiresIn : 60*60*24// 授权时效24小时
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
    User.findUserById(req.decoded._id)
        .then(user=>{
            res.send({user:user[0]})
        })
        .catch(err=>{
            console.log("get user err",err)
        })
})
router.post('/upload',(req,res)=>{
   let img=req.body.data;
   var user=req.body.user;
   if(img!==undefined){
       User.updateAvaById(user._id,img)
           .then(()=>{
               User.findUserById(user._id)
                   .then((result)=>{
                       let tmp = {_id:result[0]._id}
                       let token = jwt.sign(tmp,'jwtSecret', {
                           expiresIn : 60*60*24// 授权时效24小时
                       });
                       res.json({
                           success: true,
                           token: token
                       });
                   })
                   .catch(err=>{
                       console.log(err)
                   })
           })
           .catch(err=>{
           console.log(err)
       })

   }else{
       res.send("1111")
   }
})
router.post('/modInfo',(req,res)=>{
    let user = req.body;
    let id= req.decoded._id;
    User.updateUserById(id,user)
        .then(()=> {
            res.send({message:"Mod information success!"})
        })
        .catch(err=>{
            res.send({message:"Mod information err!"+err})
        })
})


module.exports = router
