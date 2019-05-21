require("./db/mongoose"); 
const express = require("express"); 
const cors = require("cors"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const playerRouter = require("./routers/player-router"); 

var allowedOrigins = ['http://localhost:3000',
                      'https://rpg-adventures-v1.herokuapp.com'];
app.use(cors({
origin: function(origin, callback){
    if(!origin) return callback(null, true);
    
    if(allowedOrigins.indexOf(origin) === -1){
    var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
    return callback(new Error(msg), false);
    }
    return callback(null, true);
}
}));

app.use(express.json()); 
app.use(playerRouter);


app.get("/", (req, res) => {
    res.status(200).send("Welcome!"); 
});

app.listen(port, (req, res) => {
    console.log("Listening on port ", port); 
}); 
