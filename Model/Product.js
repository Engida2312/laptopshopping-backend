const { response } = require('../app');

const productCollection = require('../db').db().collection("products")
const ObjectID = require('mongodb').ObjectID;
let Product = function (data, file) {
    this.data = data; 
    this.file = file;
    this.errors = [];
}

//add product
Product.prototype.addProduct = function () {
    return new Promise(async (resolve, reject) => {
        let filenames = [];
        let files = this.file;
        files.forEach(file => {
            filenames.push(file.filename);
        });
        console.log(filenames)
        this.data = {
            name: this.data.productname,
            price: this.data.price,
            category: this.data.category,
            brand: this.data.brand,
            description: this.data.description,
            image: filenames,
            createdDate: new Date()
        }
        if (this.errors.length != 0) {
            reject()
        } else {
            await productCollection.insertOne(this.data);
            resolve();
        }
    })
}


// read all product
Product.prototype.readAllProduct = function () {
    return new Promise(async (resolve, reject) => {
        await productCollection.find().toArray((err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result);
            }
        });
    })
}

//read one product
Product.prototype.readoneProduct = function (idd) {
    return new Promise(async (resolve, reject) => {
        let id = new ObjectID(idd);
        console.log(id)
        await productCollection.findOne({ _id: id }, (err, result) => {

            if (err) {
                reject()
            } else {
                resolve(result)
            }
        })


    })
}
module.exports = Product  