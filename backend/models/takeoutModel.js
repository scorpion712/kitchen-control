const mongoose = require('mongoose');

// Take out from stock Model
const takeOutSchema = new mongoose.Schema({
    week_start: Date,
    week_end: Date,
    products: [{
        name: String,
        expiry_date: Date,
        admission_date: Date,
        amount: Number,
        retirement_date: Date,
    }]
});

module.exports = mongoose.model('TakeOut', takeOutSchema);