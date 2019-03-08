const News = require('../mongo').News
const mongoose = require('mongoose')
module.exports = {
  //插入新闻
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
    },
    getNewsById: function getNewsById (newsId) {
        return News
            .findOne({ _id: newsId })
            .exec()
    }, 
    getNewsByChannel: function getNewsByChannel (channel) {
        const query = {}
        if (channel) {
            query.channel = channel
        }
        return News
            .find(query)
            .sort({ _id: 1 })
            .exec()
    },
    getChunkNews:function getChunkNews(channel,next_id) {
        const query = {
            channel : channel,
            _id:{$gt:next_id}
        }
        return News
            .find(query)
            .sort({ _id: 1 })
            .exec()
    },
  
}
