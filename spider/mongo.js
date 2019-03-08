const Mongolass = require('mongolass')
const mongolass = new Mongolass()
//mongolass.connect('mongodb://root:yushuai0911@ds157799.mlab.com:57799/lightnews')
mongolass.connect('mongodb://127.0.0.1:27017/lightnews')


exports.News = mongolass.model('News', {
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

