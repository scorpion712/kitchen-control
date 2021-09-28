const Product = require('../models/productModel');
 
// fetch products by given query. If there is not query, get all products 
module.exports.fetchProducts = async (req, res) => {
    try {  
        const product = await Product.find({}).sort( { category: 1, name: 1 } ); 
        res.send(product);
    } catch (error) { 
        res.status(404).send({message: 'Product Not Found. ' + error.message});
    }
}

// get product by given id
module.exports.getProductById = async (req, res) => {
    try {
        const product_id = req.params.product_id; 
        const product = await Product.findById(product_id);  
        res.send(product);
    } catch (error) { 
        res.status(404).send({message: 'Product Not Found. ' + error.message});
    }
}

// save a new product
module.exports.createProduct = async (req, res) => {
    try {  
        const newProduct = await new Product(req.body);
        const product = await newProduct.save(); 
        res.send(product);
    } catch (error) {
        res.status(404).send({message: 'Product not created.'+ error.message});
    } 
}

// delete a product by given id
module.exports.deleteProduct = async (req, res) => {
    try { 
        const deleted = await Product.findOneAndDelete({_id: req.params.product_id});
        res.send(deleted);
    } catch (error) {
        res.status(404).send({message: 'Product id not found. ' + error.message});
    }
}

// update product by given id
module.exports.updateProduct = async (req, res) => {
    try {
        const {name, category} = req.body; // body contains the updated prouct
        const updated = await Product.updateOne({_id: req.params.product_id}, {$set: {name: name, category: category}}); 
        res.send(updated);
    } catch (error) {
        res.status(404).send({message: 'Can not update product. Error: ' + error.message});
    }
}

// update product amount by given id removing given units
module.exports.updateAmountProduct = async (req, res) => {
    try {
        const { unit_id, amount } = req.body; // body contains product data to update 
        // find product by unit id and delete amount from its units 
        const product = await Product.findOne({ units: { $elemMatch: { _id: unit_id } } });  
        for (unit of product.units) { 
            if (unit._id == unit_id) { // find unit to delete o remove amount
                unit.amount -= amount;
            }
        }
        product.units = product.units.filter(unit => unit.amount > 0);   
        // next line is not working
        // const updated = await Product.findOneAndReplace({_id: req.body._id}, product);
        await Product.findOneAndDelete({_id: req.body._id});
        const updated = await Product.insertMany([product]);
        
        res.send(updated); 
    } catch (error) {
        res.status(404).send({message: 'Can not update product stock. Error: ' + error.message});
    }
}

// add units to a product
module.exports.addProductUnits = async (req, res) => {
    try {
        const {_id, units } = req.body;
        await Product.findOneAndUpdate({_id: _id}, {
            $push: {
                units: {$each: units}
            }
        });
    } catch (error) {
        res.status(404).send({message: 'Can not add units to product. Error: ' + error.message});
    }
}