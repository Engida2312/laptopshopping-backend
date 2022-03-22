
const multer = require('multer')
const util = require("util");

const storage = multer.diskStorage({
  //destinarion for files
  destination: function (request, file, callback) {
    callback(null, 'public/uploads/images');
  },

  //add back the extension
  filename: function(request, file, callback){
    callback(null, Date.now() + "ejo");
  },  
})

var uploadFiles = multer({ storage: storage }).array("image", 4);
var uploadFilesMiddleware = util.promisify(uploadFiles);
console.log()

module.exports = uploadFilesMiddleware;