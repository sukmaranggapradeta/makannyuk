const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    // res.send(req.session)
    Model.Food.findAll()
    .then(dataFoods=>{
        res.render('./index.ejs',{dataFoods:dataFoods})
    })
})

module.exports = Router