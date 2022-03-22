const bcrypt = require('bcryptjs');
const usersCollection = require('../db').db().collection("users") 

let User = function(data){
    this.data = data;
    this.errors = [];
} 

// user signup
User.prototype.register = function(){
    this.data = {
        username: this.data.username,
        email: this.data.email,
        password: this.data.password,
        role: "user",
    }
    return new Promise(async (resolve, reject)=>{
        if(!this.errors.length){
            let salt = bcrypt.genSaltSync(10);
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data);
            resolve();
        }else{
            reject(this.errors);
        }
    })
}

// user login
User.prototype.login = function(){
    return new Promise((resolve, reject) => {
        console.log(this.data)
        usersCollection.findOne({username: this.data.username}).then((attemptedUser)=>{
            if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)){
                let userData = attemptedUser
                console.log("logedin")
                resolve(userData);
            }else{
                reject("Invalid Email/Password"); 
            }
        }).catch(function(){
            reject("Please try again later")
        });
    });
}

module.exports = User   