const tradeDAO = require('../dao/trade-dao');
const constant = require('../utils/constant');
const StockService = {

    //API to get trade data with symbol,type, start and end date
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

    //API to get trade and price data with symbol,type, start and end date
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
    }

}


module.exports = StockService;