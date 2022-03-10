const express = require('express');
const router = express.Router();
const userController = require('./controller/userController');
const productController = require('./controller/productController');

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
    .route('/singleProduct')
    .get(productController.viewSingleProduct);
 
module.exports = router;