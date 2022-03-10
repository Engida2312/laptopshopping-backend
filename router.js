const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const productController = require('./controller/productController');
const orderController = require('./controller/productController');


// user related routes
router.get('/', userController.home);
router.get('/product',productController.product);


module.exports = router;