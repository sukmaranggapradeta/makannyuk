const Router = require('express').Router()
const Model = require('../models')

Router.get('/', function(req, res){
    console.log(req.session)
    console.log("<============")

    req.session.loginStatus = false
    console.log("<============>")
    // req.session.loginStatus = false
    console.log(req.session)
    res.redirect('/')
})


Router.post('/', function(req, res){
    console.log(req.session)
    console.log("<============")

    req.session.loginStatus = false
    console.log("<============>")
    // req.session.loginStatus = false
    console.log(req.session)
    res.redirect('/')
})

module.exports = Router