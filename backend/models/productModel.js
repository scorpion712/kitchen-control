const mongoose = require('mongoose'); 

// Product Model
const productSchema = new mongoose.Schema({ 
    name: String,
    category: String,
    units: [{
        expiry_date: Date,
        admission_date: Date,
        amount: Number,
    }], 
    //days_off: Number,
});

module.exports = mongoose.model('Product', productSchema);