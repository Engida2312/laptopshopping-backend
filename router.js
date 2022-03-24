const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const productController = require('./controller/productController');
const orderController = require('./controller/orderController');

// user related routes
router.get('/', userController.home);

router
    .route('/signin')
    .get(userController.viewSignin)
    .post(userController.signin);

router
    .route('/signup')
    .post(userController.signup);

router
    .route('/signout')
    .post(userController.signout);

router
    .route('/allusers')
    .get(userController.allUsers);
router
    .route('/singleProduct/:id')
    .get(productController.viewSingleProduct);

router
    .route('/addProduct')
    .get(productController.viewAddProduct)
    .post(productController.addProduct);

 router
     .route('/orderSummery/:id')
     .get(orderController.ViewOrderSummery)
     .post(orderController.orderProduct)
    

module.exports = router; 