const express = require('express');
const isAuthenticate = require('../service/token-service');
const stockService = require('../service/stock-service');
const route = express.Router();
const constant = require('../utils/constant');
const response = require('../utils/custom-response');

//API to get trade data with symbol,type, start and end date
route.get('/:stockSymbol/trades', (req, res) => {

    let conditionObj = {
        symbol: req.params.stockSymbol,
        type: req.query.type,
        start: new Date(req.query.start),
        end: new Date(req.query.end)
    };
    stockService.getByCondition(conditionObj).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));
    })
});

//API to get trade and price data with symbol,type, start and end date
route.get('/:stockSymbol/price', (req, res) => {

    let conditionObj = {
        symbol: req.params.stockSymbol,
        start: new Date(req.query.start),
        end: new Date(req.query.end)
    };
    stockService.getPrice(conditionObj).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));
    })
});


module.exports = route;