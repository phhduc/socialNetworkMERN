const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config();

//app config
const app = express();
const port = process.env.PORT ||  8080


//middleware
app.use(express.json())

//mongoose model
require('./models/user')
require('./models/post')

//database

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', ()=> console.log('db connected'))
mongoose.connection.on('error', (err)=>console.log('err connect ',err))
//routes
app.use('/api',require('./routes/auth'))
app.use('/api', require('./routes/post'))
app.use('/api', require('./routes/user'))

//listen
app.listen(port, ()=>{
    console.log(`listen on port: ${port}`)
})