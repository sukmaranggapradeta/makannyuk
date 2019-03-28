const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    Model.Food.findAll({
        order:[["id","ASC"]],
        include:[{model:Model.Ingredient}]
    })
    .then(myfoodslist=>{
    // res.send(myfoodslist)
        res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:false})
    })
})

Router.get('/delete/:id',(req,res)=>{
    Model.Food.destroy({
        where:{
            id : req.params.id
        }
    })
    .then(dataFood=>{
        Model.Food.findAll({
            order:[["id","ASC"]],
            include:[{model:Model.Ingredient}]
        })
        .then(myfoodslist=>{
        // res.send(myfoodslist)
            res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:true})
        })
    })
    .catch(err=>{
        res.send('database err')
    })
}) 

module.exports = Router