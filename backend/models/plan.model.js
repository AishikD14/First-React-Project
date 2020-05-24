const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    note: {type: String, require: true}
},
{
    timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;