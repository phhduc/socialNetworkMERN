const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');

const authRouter = require('./routers/auth')

require('dotenv').config();
const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log("connected to mongodb");
})
.catch(err=>{
    console.log(err);
});

app.use('/auth', authRouter)
app.listen(port, function(){
    console.log("APP running on port " + port);
})

