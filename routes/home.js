const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    res.render('./index.ejs')
})

module.exports = Router