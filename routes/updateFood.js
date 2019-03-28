const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    // res.send("masuk")
    Model.Category.findAll()
    .then(dataCategory=>{
      // res.send(dataCategory)
      res.render('./updateFood.ejs',{dataCategory:dataCategory})
    })
    .catch(err=>{
      res.send(err.message)
    })
})



module.exports = Router