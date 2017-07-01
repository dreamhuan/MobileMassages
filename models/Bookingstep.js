const base = require('./Base');
const ObjectId = base.ObjectId;
const BookingstepSchema = new base.Schema({
    type: String,
    id: String,
    options: [String]
});
const BookingstepModel = base.mongoose.model('BookingstepModel', BookingstepSchema, 'bookingstep');
exports.BookingstepModel = BookingstepModel;