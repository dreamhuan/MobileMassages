const base = require('./Base');
const ObjectId = base.ObjectId;
const FaqSchema = new base.Schema({
    title: String,
    content: String
});
const FaqModel = base.mongoose.model('FaqModel', FaqSchema, 'faq');
exports.FaqModel = FaqModel;