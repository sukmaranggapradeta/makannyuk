const Router = require('express').Router()
const Model = require('../models')

Router.get('/',(req,res)=>{
    res.render('./login.ejs')
})

Router.post('/',(req,res)=>{
    let input = req.body
    res.send(input)
    Model.User.findOne({
        where :{
            user_name : input.user_name
        }
    })
    .then(sukses=>{
        if(input.password === sukses.password){
            res.send("sukses")
        }else{
            res.send("password salah")
        }
    })
    .catch(err=>{
        res.send("user_name not found")
    })
})


module.exports = Router