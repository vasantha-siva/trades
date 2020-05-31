const tradeModel = require('../model/trade-schema');
const StockDAO = {

    checkExistSymbol: (symbol) => {
        return tradeModel.findOne({ symbol: symbol });
    },

    checkTradeData: (condition) => {
        let matchSymbol = { symbol: condition.symbol, timestamp: { $gte: condition.start, $lte: condition.end } };
        return tradeModel.find(matchSymbol);
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

    }
}
module.exports = StockDAO;