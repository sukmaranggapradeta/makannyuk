const Router = require('express').Router()
const Model = require('../models')
const crypto = require('crypto'); 
Router.get('/',(req,res)=>{
    res.render('./login.ejs')
})

Router.post('/',(req,res)=>{
    let input = req.body
    // res.send(input)
    // console.log(input.user_name)
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
            console.log(`masuk <================`)
          req.session.loginStatus = true
          req.session.userName = input.user_name
          console.log(`${req.session.loginStatus} <================`)
            // res.send(req.session.loginStatus)
          res.redirect('/')
        }else{
            res.send("password salah")
        }
    })
    .catch(err=>{
        res.send("user_name not found")
    })
})


module.exports = Router