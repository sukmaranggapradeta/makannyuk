const Router = require('express').Router()
const model = require('../models')

Router.get('/:id', function(req,res){
        let id = req.params.id
        model.Food.findByPk(id, {
            include: [model.Ingredient, model.Category ]
        })
        .then(function(data){
            // res.send(data)
            res.render('detailFood.ejs',{data})
        })
        .catch(function(err){
           res.redirect('/')
            
        })
})

module.exports = Router