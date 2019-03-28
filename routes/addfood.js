const Router = require('express').Router()
const Model = require('../models')
//MULTER
const multer = require('multer')
const path = require('path')
const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
 
var upload = multer({ dest: './public/upload/' })

const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

Router.get('/',(req,res)=>{
    // res.send("masuk")
    Model.Category.findAll()
    .then(dataCategory=>{
      // res.send(dataCategory)
      res.render('./addFoods.ejs',{dataCategory:dataCategory})
    })
    .catch(err=>{
      res.send(err.message)
    })
})

Router.post('/', upload.single('myPicture'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  
  // res.send(req.body)
  // return 0
  let picName = req.file.filename
  let input = req.body
  let newIngredient = input.ingredient.split(",") 
  let foodName = input.food_name
  // res.send(input)
  Model.Category.findOne({
    where:{
      category_name : input.category
    }
  })
  .then(idCategory=>{
    // res.send(idCategory)
    let categoryId = idCategory.id
      Model.Food.create({
        food_name: input.food_name,
        picture: picName,
        description: input.deskripsi,
        UserId: 1,
        CategoryId:idCategory.id
      })
      .then(sukses=>{
        // upload(req, res, (err) => {
        //   file: `uploads/${req.file.filename}`
        // })
        // upload(req, res, (err) => {
        //   if(err){
        //     Model.Category.findAll()
        //     .then(dataCategory=>{
        //       // res.send(dataCategory)
        //       res.render('./addFoods.ejs', {
        //         msg: err.message,
        //         dataCategory :dataCategory
        //       });
        //     })
        //   } else {
        //     if(req.file == undefined){
        //       res.render('./addFoods.ejs', {
        //         msg: 'Error: No File Selected!'
        //       });
        //     } else {
        //         res.render('./addFoods.ejs', {
        //           msg: 'File Uploaded!',
        //           file: `uploads/${req.file.filename}`
        //         });
        //       }
        //     }
        //   });
        for (let i = 0 ; i < newIngredient.length ; i++){
          Model.Ingredient.findOne({
            where :{
              ingredient_name : newIngredient[i]
            }
          })
          .then(foundOr=>{
            if(foundOr === null || foundOr === undefined ){
              Model.Ingredient.create({
                  ingredient_name: newIngredient[i],
                  createdAt: new Date(),
                  updatedAt: new Date()
              })
            }
          })
          .catch(err=>{
            res.send(err.message)
          })
        }
        //looping lagi
        for (let i = 0 ; i < newIngredient.length ; i++){
          Model.Food.findOne({
            where:{
              food_name:foodName
            }
          })
          .then(idFood=>{
            Model.Ingredient.findOne({
              where:{
                ingredient_name:newIngredient[i]
              }
            })
            .then(idIngredient=>{
              Model.Food_Ingredient.create({
                FoodId: idFood.id,
                IngredientId: idIngredient.id,
                createdAt: new Date(),
                updatedAt: new Date()
              })
              .then(sukses=>{
                res.send("save sukses")
              })
              .catch(err=>{
                res.send(err.message)
              })
            })
            .catch(err=>{
              res.send(err.message)
            })
          })
          .catch(err=>{
            res.send(err.message)
          })

        }

      })
      .catch(err=>{
        res.send(err.message)
      })
  })
  .catch(err=>{
    res.send(err.message)
  })

})

// Router.post('/', (req,res)=>{

// })



// Router.post('/',(req,res)=>{

//   });

//SET STORAGE FILE
// const storage = multer.diskStorage({
//     destination:'./public/upload/', 
//     filename:function(req,file,cb){
//         cb(null,file.fieldname + "-" + Date.now()+ path.extname(file.originalname))
//     }
// })

//INIT UPLOAD
// const upload = multer({
//     storage:storage,
//     limits:{fileSize: 1000000 },
//     fileFilter: function(req, file, cb){
//         checkFileType(file, cb);
//       }
// }).single('myPicture')

// // Check File Type
// function checkFileType(file, cb){
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
  
//     if(mimetype && extname){
//       return cb(null,true);
//     } else {
//       cb('Error: Images Only!');
//     }
//   }


module.exports = Router