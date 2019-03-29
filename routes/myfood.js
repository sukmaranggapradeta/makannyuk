const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    // console.log(req.session)
    // console.log(`${req.session.loginStatus} <================`)
    Model.Food.findAll({
        order:[["id","ASC"]],
        include:[
            {model:Model.Ingredient},
            {model:Model.Category},
        ]
    })
    .then(myfoodslist=>{
    // res.send(myfoodslist)
        res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:false ,updateText:null, currentUser: req.session.loginStatus})
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
                include:[
                    {model:Model.Ingredient},
                    {model:Model.Category}
                ]
            })
            .then(myfoodslist=>{
            // res.send(myfoodslist)
            // return 0
                res.render('./myFoods.ejs',{myfoodslist:myfoodslist, msg:true,updateText:null})
            })
        })
        .catch(err=>{
            res.send('database err')
        })    
    })

module.exports = Router