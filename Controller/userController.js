const User = require('../model/User');
const usersCollection = require('../db').db().collection("Users");
const bcrypt = require('bcryptjs');


//home
exports.home = function(req, res){
    res.render('home')
            
}