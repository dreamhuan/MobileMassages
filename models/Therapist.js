const base = require('./Base');
const ObjectId = base.ObjectId;
const TherapistSchema = new base.Schema({
    name: String,
    img: String,
    intro: String
});
const TherapistModel = base.mongoose.model('TherapistModel', TherapistSchema, 'therapist');
exports.TherapistModel = TherapistModel;//导出TherapistModel实体