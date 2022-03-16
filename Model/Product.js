const productCollection = require('../db').db().collection("products")

let Product = function (data) {
    this.data = data;
    this.errors = [];
}

//add product
Product.prototype.addProduct = function () {
    return new Promise(async (resolve, reject) => {
        this.data = {
            name: this.data.productname,
            price: this.data.price,
            category: this.data.category,
            brand: this.data.brand,
            description: this.data.description,
            storage: this.data.storage,
            ram: this.data.ram,
            image: this.data.image,
            createdDate: new Date()
        }
        if(this.errors.length != 0){
            reject()
        }else{
            await productCollection.insertOne(this.data);
            resolve();
        }
    })
}


module.exports = Product  