const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/lightnews',{useNewUrlParser: true,useCreateIndex: true})
mongoose.Promise = global.Promise

exports.News = mongoose.model('News', {
  title: { type: 'string' },
  author: { type: 'string' },
  href: { type: 'string' },
  img: { type: 'string' },
  time: { type: 'string' },
  channel: { type: 'string' },
  original_href: { type: 'string'},
  tags: { type:'string'},
  content: { type:'string'}
})

exports.HotSearchList = mongoose.model('HotSearchList', {
    keyword: { type: 'string' },
    searchCount:{type:'number'}
})
exports.User = mongoose.model('User', {
    nickname: { type: 'string' },
    phone:{type: 'string',required:true ,unique: true},
    password:{type: 'string'},
    birth:{type:'string',default:""},
    avatar:{type: 'string',default:'https://profile.csdnimg.cn/2/B/3/1_qq_29002631'},
    region:{type:'string',default:"四川省_成都市"},
    industry:{type: 'string',default:""},
    keyword:[],
    history:[],
})
