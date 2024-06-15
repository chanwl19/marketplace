const express = require('express');
const productsController = require('../controllers/products');
const router = express.Router();

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createProduct)
    .delete(productsController.deleteAllProducts);

router.route('/:id')
    .get(productsController.getProductById)
    .put(productsController.updateProductById)
    .delete(productsController.deleteProductById);

module.exports = router;

