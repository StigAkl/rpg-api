require('./db/mongoose'); 
const express = require("express"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const Player = require('./entities/player'); 

const player = new Player({
    name: "Stig", 
    email: "stg@hotmail.no",
    username: "stigakl",
    password: "kake123"
}); 

player.save().then((player) => {
    console.log("Player created:", player); 
}).catch((error) => {
    console.log("Something went wrong: ", error); 
})
  
app.get("/player", (req, res) => {
    const player = new Player({
        name: "Stig", 
        email: "stg@hotmail.no",
        username: "stigakl",
        password: "kake123"
    }); 
    
    player.save().then((player) => {
        player.env = process.env.ENV_TEST; 
        res.send(player); 
    }).catch((error) => {
        res.status(500).send("Something went wrong: ", error);  
    })
});
app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 

