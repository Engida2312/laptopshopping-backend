const Product = require('../model/Product');

//addProductpage
exports.addProductpage = function (req, res) {
    res.render('ProductPage')
}


//addProduct
exports.addProduct = function (req, res) {
    let product = new Product(req.body);
    product.addProduct().then(() => {
        res.render('ProductPage')
    })


    // single product
    exports.viewSingleProduct = function (req, res) {
        if (req.session.user) {
            res.render('singleProduct', {
                username: req.session.user.username,
                role: req.session.user.role
            })
        } else {
            res.render('singleProduct', {
                username: "",
                role: ""
            })
        }

    }



} 