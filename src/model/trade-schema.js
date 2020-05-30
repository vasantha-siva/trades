const mongoose = require('mongoose');

const constant = require('../utils/constant');
const Schema = mongoose.Schema;

// Create Schema objects and set validations for trade
const tradeSchema = new Schema({
    id: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',

    },
    symbol: {
        type: String,
        trim: true,
        required: true
    },
    shares: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }


});




module.exports = mongoose.model(constant.MODEL_NAME.TRADE, tradeSchema); //Compiling schema to model