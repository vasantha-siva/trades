const express = require('express');
const isAuthenticate = require('../service/token-service');
const tradeService = require('../service/trade-service');
const route = express.Router();
const constant = require('../utils/constant');
const response = require('../utils/custom-response');

//API to create trade
route.post('/', isAuthenticate, (req, res) => {
    tradeService.create(req.body, req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(response.success(constant.HTML_STATUS_CODE.CREATED, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR, { message: error.message }));
    })
});

//API to get all trades
route.get('/', (req, res) => {
    tradeService.getAll().then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(constant.STATUS.FAIL, error.message));
    })
});

//API to get trade date with userId
route.get('/users/:user', isAuthenticate, (req, res) => {
    tradeService.getByUserId(req.params.user, req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, result));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message));
    })
});

//API to delete trade
route.delete('/', isAuthenticate, (req, res) => {
    tradeService.delete(req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(response.success(constant.HTML_STATUS_CODE.SUCCESS, { message: result }));
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(response.error(constant.STATUS.FAIL, error.message));
    })
});




module.exports = route;