require("./db/mongoose"); 
const express = require("express"); 
const cors = require("cors"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const playerRouter = require("./routers/player-router"); 

app.use(express.json()); 
app.use(playerRouter);
app.use(cors({
    origin: "http://localhost:3000"
})); 

app.post("/api/redirect", (req, res) => {

    const username = req.body.username; 
    const password = req.body.password; 

    console.log("Username: " + username);
    console.log("PAssword: ", password);  
    res.send("Hello"); 
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome!"); 
});

app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 
