const mongoose = require('../config/config').mongoose;
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

exports.mongoose = mongoose;
exports.Schema = Schema;
exports.ObjectId = ObjectId;
