const News = require('../mongo').News
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
            .find({ _id: newsId })
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
    getNewsByKey:function getNewsByKey(key) {
        const query = {
            '$or':[{title:eval("/"+key+"/i")},{author:eval("/"+key+"/i")},{tags:eval("/"+key+"/i")}]
        }
        return News
            .find(query)
            .sort({ _id: 1 })
            .exec()
    },
    getNewsByKeyword:function getNewsByKeyword(key) {
        let arr=[];
        key.map((item)=>{
            arr.push({title:eval("/"+item+"/i")});
            arr.push({author:eval("/"+item+"/i")});
            arr.push({tags:eval("/"+item+"/i")});
        })
        const query = {
            '$or':arr
        }
        return News
            .find(query)
            .sort({ _id: 1 })
    },



}
