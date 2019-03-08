const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/lightnews',{useNewUrlParser: true })
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
