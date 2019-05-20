require('./db/mongoose'); 
const express = require("express"); 
const port = process.env.port || 3001; 
const app = express(); 
const Player = require('./entities/player'); 

app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 

