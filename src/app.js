require("./db/mongoose"); 
const express = require("express"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const playerRouter = require("./routers/player-router"); 

app.use(express.json()); 
app.use(playerRouter);


app.get("/", (req, res) => {
    res.status(200).send("Welcome!"); 
})
app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 
