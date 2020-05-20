const userDAO = require('./../dao/user-dao');
const constant = require('../utils/constant');

const UserService = {

    create: (userDetail) => {
        return new Promise((resolve, reject) => {
            userDAO.checkExist(userDetail.name).then((data) => {
                if (data) {
                    reject({ status: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.USER.USER_ALREADY_REGISTERED });
                } else {
                    userDAO.create(userDetail).then((result) => {
                        // delete result.password;
                        resolve({ message: constant.MESSAGE.USER.CREATED });
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });
                    });
                }
            });
        });
    },

}


module.exports = UserService;