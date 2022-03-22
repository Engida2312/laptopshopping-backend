const { response } = require('../app');

const productCollection = require('../db').db().collection("products")

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
            storage: this.data.storage,
            ram: this.data.ram,
            image: filenames,
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


// read all product
Product.prototype.readAllProduct =  function(){
    return new Promise(async(resolve, reject)=>{
        await productCollection.find().toArray((err, result)=>{
           if(err){
               reject()
           }else{
               resolve(result);
           }
        });
        // console.log(result) 
    })
}

module.exports = Product  