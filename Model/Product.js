const productCollection = require('../db').db().collection("products")

let Product = function (data) {
    this.data = data;
    this.errors = [];
}

//add product
Product.prototype.addProduct = function () {
    this.data = {
        _id: this.data._id,
        name: this.data.Productname,
        price: this.data.price,
        category: this.data.category,
        brand: this.data.brand,
        storage: this.data.storage,
        ram: this.data.ram,
        productImage: " "
    }
    return new Promise(async () => {
            await productCollection.insertOne(this.data);
          
       
    })
}


module.exports = Product  