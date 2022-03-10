const productCollection = require('../db').db().collection("products") 

let Product = function(data){
    this.data = data;
    this.errors = [];
} 




module.exports = Product  