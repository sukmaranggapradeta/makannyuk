const Router = require('express').Router()
const model = require('../models')

Router.get('/', function(req,res){
        model.Food.findAll({
            include: model.Ingredient
        })
        .then(function(data){
            res.send(data)
            // res.render('showDataSubject.ejs',{data})
        })
        .catch(function(err){
            console.log(err)
            
        })
})

module.exports = Router