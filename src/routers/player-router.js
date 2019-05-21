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
            res.send(player); 
        }
    } catch(e) {
        res.status(500).send({
            error: "Internal server error"
        });
    }
});

router.get("/api/playerinformation", auth, async (req, res) => {
    
    const id = req.query.id; 
    try  {
        const player = await Player.findById(id);

        if(!player) {
            throw new Error("Player not found"); 
        }

        res.send(player); 
    } catch(e) {
        res.status(400).send({
            error: "Could not fetch player information" + e
        });
    }
});

router.post("/api/players", async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(player);  
    } catch(error) {
        res.status(400).send({
            error: "Could not create player: " + error
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
            error: "Could not log in. Make sure username and password is correct"
        });
    }
});

router.put("/api/players", async (req, res) => {
    const updates = Object.keys(req.body); 
    const allowedUpdates = ["level", "experience"]; 
});

router.patch("/api/players", async (req, res) => { 
    console.log(req);
    //res.json(req); 
}); 

module.exports = router; 