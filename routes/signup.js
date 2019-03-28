const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    res.render('./signup.ejs')
})

Router.post('/',(req,res)=>{
    let input = req.body
    Model.User.create({
        first_name: input.first_name,
        last_name: input.last_name,
        gender: input.gender,
        email: input.email,
        user_name: input.user_name,
        password: input.password,
        createdAt:new Date,
        updatedAt:new Date
    })
    .then(sukses=>{
        res.redirect('/login')
    })
    .catch(err=>{
        res.send(err.message)
    })
})
module.exports = Router