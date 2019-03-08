const News = require('../mongo').News

module.exports = {
  /*insertMany: function insertMany (list) {
    return News.insertMany(list).exec()
  }*/
  upsert: function upsert(news) {
    return News 
              .updateOne({"href":news.href},{$set: {"title": news.title,
                                                    "author": news.author,
                                                    "img": news.img,
                                                    "time": news.time,
                                                    "channel": news.channel,
                                                    "original_href": news.original_href,
                                                    "tags": news.tags,
                                                    "content": news.content}},{"upsert":"true"}).exec()
  }
  /*insertMany: function insertMany (list) {
    return News.updateMany(list,{"upsert": "true"}).exec()
  }*/
}