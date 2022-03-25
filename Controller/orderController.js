const Product = require('../Model/Product');
const Order = require('../Model/Order');
const User = require('../model/User');
exports.ViewOrderSummery = async function (req, res) {
    if (req.session.user) {
        let oneproduct = new Product(req.body);
        let result = await oneproduct.readoneProduct(req.params.id);
        console.log(result)
        res.render('orderSummery', {
            username: req.session.user.username,
            role: req.session.user.role,
            userid: req.session.user.id,
            oneproduct: result,


        })
    } else {
        res.render('signin')
    }

}

//Order Product
exports.orderProduct = async function (req, res) {
    if (req.session.user) {
        let userid = req.session.user.id
        console.log(userid)
        let order = new Order(req.body);
        order.orderProduct(userid).then(() => {
            res.redirect('/')
        }).catch(() => {
            res.redirect('/orderSummery:id')
        })

    } else {
        res.render('signin')
    }

}
//view order of all user
exports.viewAllOrder = async function (req, res) {
    let order = new Order(req.body);
    result = await order.readAllOrder();
    res.render('allOrder', {
        username: req.session.user.username,
        role: req.session.user.role,
        allOrder: result

    })

}

//view   Orders of a singel user
exports.viewOrder = async function (req, res) {
    if (req.session.user) {
        let userid = req.session.user.id
        let product = new Product(req.body);
        let order = new Order(req.body);
        result = await order.getOrder(userid);
        console.log(result);
         let productsid = [];
        let orderedProducts = [];
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            productsid.push(element.productid)
            // orderedProducts.push(await product.readoneProduct( element.productid));
        }
       let orderid = productsid.filter((item, 
            index) => productsid.indexOf(item) === index);
        for (let index = 0; index < orderid.length; index++) {
            const element = orderid[index];
            orderedProducts.push(await product.readoneProduct(element));
        }
        // console.log(orderedProducts)
        res.render('myOrder', {
            username: req.session.user.username, 
            role: req.session.user.role,
            Orders: orderedProducts

        })
    } else {
        res.render('signin')
    }
}