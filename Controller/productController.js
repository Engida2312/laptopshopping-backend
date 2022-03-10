const Product = require('../model/Product');
const produtCollection = require('../db').db().collection("Products");
const bcrypt = require('bcryptjs');


//home
exports.product = function(req, res){
    res.render('Singelpage')
            
}