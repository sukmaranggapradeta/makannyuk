const Router = require('express').Router()
const Model = require('../models')
const multer = require('multer')


Router.get('/:id',(req,res)=>{
    // res.send("masuk")
    // res.send(req.body)
    Model.Food.findByPk(
        req.params.id,{
            include:[Model.Ingredient,Model.Category]
        })
    .then(editFood=>{
        // res.send(editFood)
        Model.Category.findAll()
        .then(dataCategory=>{
            // res.send(dataCategory)
            res.render('./updateFood.ejs',{editFood:editFood,dataCategory:dataCategory, currentUser: req.session.loginStatus})
        })
        .catch(err=>{
            res.send(err.message)
        })
    })
    .catch(err=>{
      res.send(err.message)
    })
})

Router.post('/:id', function (req, res, next) {
    // res.send(req.body)
    // return 0
    let input = req.body
    let food_name = input.food_name
    let category_name = input.category
    let deskripsi = input.deskripsi
    
    // res.send(input)
    // // res.send(input)
    Model.Category.findOne({
        where:{
            category_name : category_name 
        }
    })
    .then(dataCategory=>{
        let category_Id = dataCategory.id
        Model.Food.update({
          food_name: food_name,
          description: deskripsi,
          CategoryId:category_Id
        },{
            where:{
                id : req.params.id
            }
        })
        .then(suksesEdit=>{
            // res.send("update")
            if (input.ingredient.length > 0){
                let newIngredient = input.ingredient.split(",") 
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
                        }else{
        
                        }
                    })
                    .catch(err=>{
                        res.send(err.message)
                    })
                }
                    ////looping lagi
                for (let i = 0 ; i < newIngredient.length ; i++){
                    Model.Food.findOne({
                    where:{
                        food_name:food_name
                    }
                    })
                    .then(idFood=>{
                    Model.Ingredient.findOne({
                        where:{
                        ingredient_name:newIngredient[i]
                        }
                    })
                    .then(idIngredient=>{
                        Model.Food_Ingredient.update({
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
                    //endloop



            Model.Food.findAll({
                order:[["id","ASC"]],
                include:[
                {model:Model.Ingredient},
                {model:Model.Category},
                ]
            })
            .then(myfoodslist=>{
            // res.send(myfoodslist)
                res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:false ,updateText:"Success update"})
            })            

            }else{
                
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
    
    // Model.Category.findOne({
    //   where:{
    //     category_name : input.category
    //   }
    // })
    // .then(idCategory=>{
    //   // res.send(idCategory)
    //   let categoryId = idCategory.id
    //     Model.Food.update({
    //       food_name: input.food_name,
    //       description: input.deskripsi,
    //       CategoryId:idCategory.id
    //     },{
    //         where:{
    //             id : req.params.id
    //         }
    //     })
    //     .then(sukses=>{
    //       for (let i = 0 ; i < newIngredient.length ; i++){
    //         Model.Ingredient.findOne({
    //           where :{
    //             ingredient_name : newIngredient[i]
    //           }
    //         })
    //         .then(foundOr=>{
    //           if(foundOr === null || foundOr === undefined ){
    //             Model.Ingredient.create({
    //                 ingredient_name: newIngredient[i],
    //                 createdAt: new Date(),
    //                 updatedAt: new Date()
    //             })
    //           }else{

    //           }
    //         })
    //         .catch(err=>{
    //           res.send(err.message)
    //         })
    //       }
    //       //looping lagi
    //       for (let i = 0 ; i < newIngredient.length ; i++){
    //         Model.Food.findOne({
    //           where:{
    //             food_name:foodName
    //           }
    //         })
    //         .then(idFood=>{
    //           Model.Ingredient.findOne({
    //             where:{
    //               ingredient_name:newIngredient[i]
    //             }
    //           })
    //           .then(idIngredient=>{
    //             Model.Food_Ingredient.update({
    //               FoodId: idFood.id,
    //               IngredientId: idIngredient.id,
    //               createdAt: new Date(),
    //               updatedAt: new Date()
    //             })
    //             .then(sukses=>{
    //               res.send("save sukses")
    //             })
    //             .catch(err=>{
    //               res.send(err.message)
    //             })
    //           })
    //           .catch(err=>{
    //             res.send(err.message)
    //           })
    //         })
    //         .catch(err=>{
    //           res.send(err.message)
    //         })
    //       }
    //     })
    //     .catch(err=>{
    //       res.send(err.message)
    //     })
    // })
    // .catch(err=>{
    //   res.send(err.message)
    // })
// })

module.exports = Router