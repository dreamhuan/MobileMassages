const base = require('./Base');
const ObjectId = base.ObjectId;
const MassagetypeSchema = new base.Schema({
    img: String,
    title: String,
    content:String
});
const MassagetypeModel = base.mongoose.model('MassagetypeModel', MassagetypeSchema, 'massagetype');
exports.MassagetypeModel = MassagetypeModel;