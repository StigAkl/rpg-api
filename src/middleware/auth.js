const jwt = require("jsonwebtoken"); 
const Player = require("../entities/player");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", ""); 
        const decodedToken = jwt.verify(token, "playerSecret")

        const player = await Player.findOne({_id: decodedToken._id, "token": token}); 

        if(!player) {
            throw new Error("Unathorized"); 
        }

        next(); 
    } catch(error) {
        res.status(401).send({
            error: "Unathorized" + error
        })
    }
}

module.exports = auth; 