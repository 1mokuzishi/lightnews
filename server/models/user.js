const User = require('../mongo').User
module.exports = {
    createUser:function createUser(userinfo) {
        var user = new User(userinfo);
        return user.save().then()
    },
    getUserByPhone:function getUserByPhone(phone) {
        return User
            .find({phone:phone}).exec()
    }

}
