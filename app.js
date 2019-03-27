const express = require('express')
const app = express()
const port = 3006
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const ejs = require('ejs')
//menggunakan library pada express
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public')); 


app.use('/',require('./routes/home'))
app.use('/login',require('./routes/login'))
app.use('/signup',require('./routes/signup'))
app.use('/addfood',require('./routes/addfood'))

app.listen(port, ()=> console.log(`server running in port ${port}`))