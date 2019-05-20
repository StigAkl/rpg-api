const express = require("express"); 
const router = express.Router(); 
const Player = require("../entities/player"); 
const auth = require("../middleware/auth"); 

router.get("/api/players", auth, async (req, res) => {
    try {
        const players = await Player.find({});
        const response = {
            player: players, 
            availableItems: players.length
        } 
        res.send(response); 
    } catch(e) {
        res.status(500).send({
            error: "Failed to fetch players",
        }); 
    }
});


router.get("/api/players/:id", async (req, res) => {
    
    const _id = req.params.id; 
    try {
        const player = await Player.findById(_id); 

        if(!player) {
            return res.status(404).send(); 
        } else {
            res.send(user); 
        }
    } catch(e) {
        res.status(500).send({
            error: "Internal server error"
        });
    }
});

router.post("/api/players", async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(user);  
    } catch(error) {
        res.status(400).send({
            error: "Could not create user: " + error
        });
    }
})


router.post("/api/players/auth", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const player = await Player.findByCredentials(email, password); 
        const token = await player.getToken(); 
        player.token = token; 
        player.save(); 
        res.send({player, token}); 
    } catch(e) {
        res.status(400).send({
            error: "Failed to authenticate player" + e
        });
    }
});

module.exports = router; 