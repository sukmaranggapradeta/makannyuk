const Router = require('express').Router()
const Model = require('../models')

Router.post('/', function(req, res){
    req.session.loginStatus = false
    console.log(req.session)
    res.redirect('/')
})

module.exports = Router