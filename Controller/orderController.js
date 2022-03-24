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
         if(req.session.user){
            let userid = req.session.user.id
           let productid = req.params.id
           console.log(userid)     
           console.log(productid)
            let order = new Order(req.body);
            order.orderProduct(productid,userid).then(() => { 
                res.redirect('/') 
            }).catch(() => {
                res.redirect('/orderSummery:id')   
            })

         }else{
            res.render('signin')
         }
           
   }
    
   
   //view   Orders
   exports.viewOrder =async function (req, res) {
    if(req.session.user){
        let userid = req.session.user.id
        result= await getOrder(userid);
        res.render('yourOrder', {
            username: req.session.user.username,
            role: req.session.user.role,
           yourOrder: result 

        })
    }else{
        res.render('signin')
     }
}