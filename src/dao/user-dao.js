const userModel = require('../model/users-schema');
const utility = require('../utils/utilities');
const UserDAO = {
    create: (userDetail) => {
        return new userModel({
            name: userDetail.name,
            email: userDetail.email,
            address: userDetail.address,
            password: userDetail.password,
            id: `USR-${utility.getRandomString(3)}`
        }).save();
    },

    checkExist: (username) => {
        return userModel.findOne({ name: username });
    },
    comparePassword: (reqPassword, UserPassword) => {
        return reqPassword == UserPassword;
    },
    getById: (data) => {
        return userModel.findOne({ _id: data });
    }
}

module.exports = UserDAO;