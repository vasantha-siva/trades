const tradeDAO = require('../dao/trade-dao');
const constant = require('../utils/constant');
const TradeService = {

    //API to create trade
    create: async(tradeDetail, user) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject({ status: constant.HTML_STATUS_CODE.UNAUTHORIZED, message: constant.MESSAGE.COMMON.MESSAGE_UNAUTHORIZED_ACCESS });

            }
            tradeDetail['user'] = user._id;
            if (!tradeDetail.id || !tradeDetail.type || !tradeDetail.price || !tradeDetail.symbol) {
                reject({ status: constant.HTML_STATUS_CODE.INVALID_DATA, message: constant.MESSAGE.COMMON.MESSAGE_INVALID_DATA });

            }
            tradeDAO.checkExist(tradeDetail.id).then((data) => {
                if (data) {
                    reject({ status: constant.HTML_STATUS_CODE.BAD_REQUEST, message: constant.MESSAGE.TRADE.ALREADY_EXIST });
                } else {
                    tradeDAO.create(tradeDetail).then((trade) => {
                        resolve(trade);
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

                    });
                }
            });
        })
    },

    //API to get all trades
    getAll: () => {
        return new Promise((resolve, reject) => {
            tradeDAO.getAll().then((data) => {
                resolve(data);
            }).catch((error) => {
                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

            })
        })
    },

    //API to get trade date with userId
    getByUserId: (userId, user) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject({ status: constant.HTML_STATUS_CODE.UNAUTHORIZED, message: constant.MESSAGE.COMMON.MESSAGE_UNAUTHORIZED_ACCESS });

            }
            tradeDAO.checkExistUser(userId).then((data) => {
                if (data) {
                    tradeDAO.getByUserId(userId).then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

                    })
                } else {
                    reject({ status: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.TRADE.NOT_EXIST });

                }
            });
        })
    },

    //API to delete trade
    delete: (user) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject({ status: constant.HTML_STATUS_CODE.UNAUTHORIZED, message: constant.MESSAGE.COMMON.MESSAGE_UNAUTHORIZED_ACCESS });

            }
            tradeDAO.delete(user._id).then(data => {
                resolve(`${data.deletedCount} trades deleted successfully`);
            }).catch((error) => {
                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

            });
        })
    }

}


module.exports = TradeService;