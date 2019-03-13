const HotSearchList = require('../mongo').HotSearchList
module.exports = {
    upsert: function upsert(key) {
        return HotSearchList
            .updateOne({"keyword":key}, {$inc:{"searchCount":1}},{"upsert":"true"}).exec()
    },
    getHotSearchList:function getHotSearchList() {
        return HotSearchList
            .find()
            .sort({ _id: 1 })
            .exec()
    }
}