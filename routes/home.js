const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    // res.send(req.session)
    Model.Food.findAll()
    .then(dataFoods=>{
        req.session.loginStatus = true
        res.render('./index.ejs',{dataFoods:dataFoods, currentUser: req.session.loginStatus})
    })
})

module.exports = Router