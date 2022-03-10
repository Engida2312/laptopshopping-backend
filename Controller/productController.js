const Product = require('../model/Product');


// single product
exports.viewSingleProduct = function(req, res){
    if(req.session.user){
        res.render('singleProduct',{
            username: req.session.user.username,
            role: req.session.user.role
        })     
    }else{
        res.render('singleProduct',{
            username: "",
            role:""
        }) 
    }
   
}