const express = require("express");
const app = express();
const port = 8080;

app.get('/', function(req, res){
    res.send("Hello");
})
app.listen(port, function(){
    console.log("APP running on port " + port);
})