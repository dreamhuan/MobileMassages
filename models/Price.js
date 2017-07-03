const base = require('./Base');
const ObjectId = base.ObjectId;
const PriceSchema = new base.Schema({
    title: String,
    therapistNumber: Number,
    priceList: [{
        time: Number,
        price: Number
    }]
});
const PriceModel = base.mongoose.model('PriceModel', PriceSchema, 'price');
exports.PriceModel = PriceModel;