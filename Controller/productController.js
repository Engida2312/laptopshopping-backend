const Product = require('../model/Product');

//addProductpage
exports.viewAddProduct = function (req, res) {
    res.render('addProductPage',{
        username: req.session.user.username,
        role: req.session.user.role
    })
}

//addProduct
exports.addProduct = function (req, res) {
    let product = new Product(req.body);
    product.addProduct().then(() => {
        res.redirect('/')
    }).catch(()=>{
        res.redirect('/addProduct')
    })
}

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