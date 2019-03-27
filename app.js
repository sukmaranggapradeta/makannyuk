const express = require('express')
const app = express()
const port = 3006


app.use('/',require('./routes/home'))


app.listen(port, ()=> console.log(`server running in port ${port}`))