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

    delete: (userId) => {
        return tradeModel.deleteMany({ user: userId });
    }
}
module.exports = TradeDAO;