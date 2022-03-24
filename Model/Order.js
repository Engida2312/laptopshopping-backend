const { response } = require('../app');

const orderCollection = require('../db').db().collection("orders")

let Order = function (data) { 
    this.data = data;
    this.errors = [];
}

Order.prototype.orderProduct = function (userid) {
    this.data = {
        userid: userid,
        productid: this.data.prodctid,
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

//read all orders of a singel user
Order.prototype.getOrder = function (userid) {
    return new Promise(async (resolve, reject) => {
        await orderCollection.find({ userid: userid }).toArray((err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result);
            }
        });
    })
}

//read all orders
Order.prototype.readAllOrder = function () {
    return new Promise(async (resolve, reject) => {
        await orderCollection.find().toArray((err, result) => {
            if (err) {
                reject()
            } else {
                resolve(result);
            }
        });
    })
}

module.exports = Order