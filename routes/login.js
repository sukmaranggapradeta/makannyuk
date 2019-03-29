const Router = require('express').Router()
const Model = require('../models')
const crypto = require('crypto'); 
Router.get('/',(req,res)=>{
    res.render('./login.ejs', {message: null})
})

Router.post('/',(req,res)=>{
    let input = req.body
    Model.User.findOne({
        where :{
            user_name : input.user_name
        }
    })
    .then(sukses=>{
        let secret= 'abcdef'
        const hash = crypto.createHmac('sha256',secret).update(input.password).digest('hex')
        input.password = hash
        if(input.password === sukses.password){
          req.session.loginStatus = true
          req.session.userName = input.user_name
            // res.send(req.session.loginStatus)
           console.log('masuuuuuk','----')
           console.log(req.session.loginStatus)
           Model.Food.findAll()
           .then(dataFoods=>{
               res.render('./index.ejs',{dataFoods:dataFoods})
           })
           .catch(function(err){
           res.send(err.message)
           })
        }else{
            res.render('./login.ejs', {message: 'password salah'})
        }
    })
    .catch(err=>{
        res.render('./login.ejs', {message: 'user name tidak ditemukan'})
    })
})


module.exports = Router