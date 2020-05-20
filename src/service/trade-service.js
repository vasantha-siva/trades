const tradeDAO = require('../dao/trade-dao');
const constant = require('../utils/constant');
const TradeService = {
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
    getAll: () => {
        return new Promise((resolve, reject) => {
            tradeDAO.getAll().then((data) => {
                resolve(data);
            }).catch((error) => {
                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

            })
        })
    },

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

    getByCondition: (condition) => {
        return new Promise((resolve, reject) => {
            tradeDAO.checkExistSymbol(condition.symbol).then((data) => {
                if (data) {
                    tradeDAO.getByCondition(condition).then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

                    })
                } else {
                    reject({ status: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.TRADE.NOT_EXIST_SYMBOL });

                }
            });
        })
    },

    getPrice: (condition) => {
        return new Promise((resolve, reject) => {
            tradeDAO.checkExistSymbol(condition.symbol).then((data) => {
                if (data) {
                    tradeDAO.checkTradeData(condition).then((result) => {
                        if (result && result.length == 0) {
                            reject({ status: constant.HTML_STATUS_CODE.SUCCESS, message: constant.MESSAGE.TRADE.NO_DATA });

                        } else {
                            tradeDAO.getPrice(condition).then((data) => {
                                resolve(data);
                            }).catch((error) => {
                                reject({ status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR });

                            })
                        }

                    });
                } else {
                    reject({ status: constant.HTML_STATUS_CODE.NOT_FOUND, message: constant.MESSAGE.TRADE.NOT_EXIST_SYMBOL });

                }
            });
        })
    },

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