const Product = require('../model/Product');
const User = require('../model/User');

//home
exports.home = async function(req, res){
    if(req.session.user){
        if(req.session.user.role == 'admin'){
            res.render('adminDashbord',{
                username: req.session.user.username,
                role: req.session.user.role
            })
        }else if(req.session.user.role == 'user'){
            let product = new Product(req.body); 
            let result = await product.readAllProduct();
            // console.log(result)
            res.render('home',{
                title:"homepage", 
                username: req.session.user.username,
                role: req.session.user.role,
                products : result
            })      
        }
    }else{
        // console.log("no session")
        let product = new Product(req.body); 
        let result = await product.readAllProduct();
        //  console.log(result)
        res.render('home',{
            username: "",
            role: "",
            products : result
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
        req.session.user = {username: userData.username, role: userData.role, id: userData._id}
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


//allUsers
exports.allUsers = function (req, res) {
    let user = new User(req.body);
    user.readAllUser().then((allUsers)=>{
        res.render('Allusers',{
            username: req.session.user.username,
            role: req.session.user.role,
            users: allUsers
        })
        console.log(allProduct)
    }).catch((err)=>{
        console.log("err" + err)
        // res.send("there is an error" + err)
    });
}