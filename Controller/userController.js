const User = require('../model/User');
const usersCollection = require('../db').db().collection("Users");
const bcrypt = require('bcryptjs');

//home
exports.home = function(req, res){
    if(req.session.user){
        if(req.session.user.role == 'admin'){
            res.render('adminDashbord',{
                username: req.session.user.username,
                role: req.session.user.role
            })
        }else if(req.session.user.role == 'user'){
            res.render('home',{
                username: req.session.user.username,
                role: req.session.user.role,
                name:"homepage"
            })
        }
    }else{
        console.log("no session")
        res.render('home',{
            username: "",
            role: "",
        })
    }
}

// sign in
exports.viewSignin = function(req, res){
    res.render('signin')     
}
// signup
exports.signup = function(req, res){
    let user = new User(req.body);
    user.register().then(()=>{
        res.redirect('/signin'); 
    }).catch((error)=>{
        req.session.save(function(){
            res.redirect('/signin');
        });
    });
}

// singin
exports.signin = function(req, res){
    let user = new User(req.body);
    user.login().then((userData)=>{
        req.session.user = {username: userData.username, role: userData.role}
        console.log(req.session.user)
        req.session.save(function(){
            res.redirect('/');
        })
    }).catch((error)=>{
        req.session.save(function(){
            res.redirect('/signin');
        })
    });
}

// singout
exports.signout = function(req, res){
    req.session.destroy(function(){
        res.redirect('/')
    })
}