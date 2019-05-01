const User = require('../mongo').User
module.exports = {
    createUser:function createUser(userinfo) {
        var user = new User(userinfo);
        return user.save().then()
    },
    getUserByPhone:function getUserByPhone(phone) {
        return User.find({phone:phone}).exec()
    },
    updateAvaById:function updateAvaById(id,img) {
        return User.updateOne({_id:id},{$set:{avatar:img}}).exec()
    },
    findUserById:function findUserById(id) {
        return User.find({_id:id}).exec()
    },
    updateUserById:function updateUserById(id,user) {
        return User.updateOne({_id:id},{$set:{phone:user.phone,industry:user.industry,nickname:user.nickname,birth:user.birth}}).exec()
    },
    addHistory:function addHistory(userId,tags) {
        return User.updateMany({_id:userId},{$push:{history:{$each:tags}}}).exec()
    },
    updateKeyword:function updateKeyword(userId,tags){
        return User.updateOne({_id:userId},{$set:{keyword:tags}}).exec()

    }


}
