const { response } = require('../app');

const orderCollection = require('../db').db().collection("orders")

let Order = function (data) {
    this.data = data;
    this.errors = [];
}

Order.prototype.orderProduct = function (productid,userid) {
    this.data = {
        userid: userid,
        productid: productid, 
        addressname: this.data.name,
        mobile: this.data.mobile,
        pincode: this.data.pincode,
        locality: this.data.locality,
        address: this.data.address,
        city: this.data.city,
        state: this.data.state,
        landmark: this.data.landmark,
        altmobile: this.data.altmobile,
        addrestype: this.data.addrestype,
        paymentoption: this.data.paymentoption

    }
    return new Promise(async (resolve, reject) => {
        if (!this.errors.length) {
            await orderCollection.insertOne(this.data);
            resolve();
        } else {
            reject(this.errors);
        }
    })
}

//read all orders of a user
Order.prototype.getOrder = function (userid) {
    return new Promise(async (resolve, reject) => {
        await orderCollection.find({userid:userid}).toArray((err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result);
            }
        });
    })
}
module.exports = Order