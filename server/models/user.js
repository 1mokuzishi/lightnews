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
    }


}
