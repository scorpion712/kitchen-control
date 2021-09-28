
const express = require('express');
const ctrlProducts = require('../controller/ctrlProducts');

const router = express.Router();

// Products routes 
router.get('/products', ctrlProducts.fetchProducts); // route to get all products or filter by query
router.get('/products/:product_id', ctrlProducts.getProductById); // route to get product by id
router.post('/products', ctrlProducts.createProduct); // route to create a new product
router.delete('/products/:product_id', ctrlProducts.deleteProduct); // route to delete product by given id
router.put('/products/:product_id', ctrlProducts.updateProduct); // route to update product by given id
router.put('/products/edit/:product_id', ctrlProducts.updateAmountProduct); // route to update product by given id setting units by given parameter
router.post('/products/units', ctrlProducts.addProductUnits); // route to add units to a product


module.exports = router;