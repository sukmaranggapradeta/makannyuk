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
                // res.send("save sukses")
                    Model.Food.findAll({
                      order:[["id","ASC"]],
                      include:[
                          {model:Model.Ingredient},
                          {model:Model.Category}
                      ]
                  })
                  .then(myfoodslist=>{
                  // res.send(myfoodslist)
                  // return 0
                      res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:false,updateText:"save success"})
                  })
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



module.exports = Router