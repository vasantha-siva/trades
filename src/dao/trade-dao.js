const tradeModel = require('../model/trade-schema');
const userModel = require('../model/users-schema');
const TradeDAO = {
    create: (tradeDetail) => {
        return new tradeModel({
            id: tradeDetail.id,
            type: tradeDetail.type,
            symbol: tradeDetail.symbol,
            user: tradeDetail.user,
            shares: tradeDetail.shares,
            price: tradeDetail.price,
        }).save();
    },

    checkExist: (id) => {
        return tradeModel.findOne({ id: id });
    },

    checkExistUser: (id) => {
        return userModel.findOne({ _id: id });
    },
    checkExistSymbol: (symbol) => {
        return tradeModel.findOne({ symbol: symbol });
    },

    checkTradeData: (condition) => {
        let matchSymbol = { symbol: condition.symbol, timestamp: { $gte: condition.start, $lte: condition.end } };
        return tradeModel.find(matchSymbol);
    },
    getAll: () => {
        return tradeModel.find({}).sort({ "id": 1 }).populate({
            path: "user",
            select: { _id: 0, id: 1, name: 1 }
        });
    },

    getByUserId: (userId) => {
        return tradeModel.find({ user: userId }).sort({ "id": 1 }).populate({
            path: "user",
            select: { _id: 0, id: 1, name: 1 }
        });
    },

    getByCondition: (condition) => {
        return tradeModel.find({ symbol: condition.symbol, type: condition.type, timestamp: { $gte: condition.start, $lte: condition.end } }).sort({ "id": 1 }).populate({
            path: "user",
            select: { _id: 0, id: 1, name: 1 }
        });
    },

    getPrice: async(condition) => {
        let matchSymbol = { symbol: condition.symbol, timestamp: { $gte: condition.start, $lte: condition.end } };

        return tradeModel.aggregate(
            [{
                    $match: matchSymbol
                },
                {
                    $group: {
                        _id: "$symbol",
                        highest: { $max: "$price" },
                        lowest: { $min: "$price" }
                    }
                }
            ]
        )

    },

    delete: (userId) => {
        return tradeModel.deleteMany({ user: userId });
    }
}
module.exports = TradeDAO;