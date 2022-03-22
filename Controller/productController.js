const Product = require('../Model/Product');
const uploads = require('../Middleware/upload');

//addProductpage
exports.viewAddProduct = function (req, res) {
    res.render('addProductPage',{
        username: req.session.user.username,
        role: req.session.user.role
    })
}

//addProduct
exports.addProduct = async function (req, res) {
    // image upload
    try {
        await uploads(req, res);
        console.log(req.files);
    
        if (req.files.length <= 0) {
          return res
            .status(400)
            .send({ message: "You must select at least 1 file." });

        }else{
          
            let product = new Product(req.body, req.files);
            product.addProduct().then(() => {
                res.redirect('/')
            }).catch(()=>{
                res.redirect('/addProduct')
            })
 
        }

    } catch (error) {
        console.log(error);
    
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).send({
            message: "Too many files to upload.",
          });
        }
        return res.status(500).send({
          message: `Error when trying upload many files: ${error}`,
        });
    
        // return res.send({
        //   message: "Error when trying upload image: ${error}",
        // });
    }
}

// single product
exports.viewSingleProduct = function (req, res) {
    if (req.session.user) {

        res.render('singleProduct', {
            username: req.session.user.username,
            role: req.session.user.role
        })
    } else {
        res.render('singleProduct', {
            username: "",
            role: ""
        })
    }

}