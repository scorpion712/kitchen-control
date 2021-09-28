const mongoose = require('mongoose'); 
const express = require('express');
const productRouter = require('./routers/productRouter');
const takeOutRouter = require('./routers/takeOutRouter');

const mongodbUrl = "mongodb://localhost/stock-hogar";

mongoose.connect(mongodbUrl, {
    // use this to fix all deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch((error) => console.log("error", error.message));

const app = express();
// add middleware to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// adding API routes and controller
app.use('/api', productRouter);
app.use('/api', takeOutRouter); // takes out from stock
 
app.listen(5000, () => {
    console.log('Server started.');
})
