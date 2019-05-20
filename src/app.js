require('./db/mongoose'); 
const express = require("express"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const subdomain = require("express-subdomain"); 
const playerRouter = require("./routers/player-router"); 


app.use(subdomain("api", playerRouter));

app.use(express.json()); 

app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 

