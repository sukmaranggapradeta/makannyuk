const Router = require('express').Router()
const Model = require('../models')
//MULTER
const multer = require('multer')
const path = require('path')
const ejs = require('ejs')


Router.get('/',(req,res)=>{
    // res.send("masuk")
    res.render('./addFoods.ejs')
})

Router.post('/', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.render('./addFoods.ejs', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('./addFoods.ejs', {
            msg: 'Error: No File Selected!'
          });
        } else {
          let input = req.body
          res.send(req.file.filename)
          // Model.Food.create({
          //   food_name: input.food_name,
          //   picture: req.file.filename,
          //   description: input.description,
          //   UserId: input.INTEGER,
          //   CategoryId: input.INTEGER,

          // })
          res.render('./addFoods.ejs', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  });

//SET STORAGE FILE
const storage = multer.diskStorage({
    destination:'./public/upload/', 
    filename:function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now()+ path.extname(file.originalname))
    }
})

//INIT UPLOAD
const upload = multer({
    storage:storage,
    limits:{fileSize: 1000000 },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
      }
}).single('myPicture')

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }


module.exports = Router