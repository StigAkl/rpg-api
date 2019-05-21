const mongoose = require("mongoose"); 
const validator = require("validator"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const tokenSecret = process.env.TOKEN_SECRET || "playerSecret"; 

const playerSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        trim: true,
        unique: true
    },
    email: {
        type: String, 
        require: true, 
        trim: true, 
        lowercase: true, 
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email"); 
            };
        }
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 7, 
        trim: true, 
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("Password cannot ocntain 'password'"); 
            }
        }
    },
    money: {
        type: Number, 
        default: 10000, 
        validate(value) {
            if(value < 0) {
                throw new Error("Money can't be less than 0"); 
            }
        }
    },
    level: {
        type: Number, 
        default: 1, 
        validate(value) {
            if(value < 0 || value > 100) {
                throw new Error("Level must be between 0 and 100"); 
            }
        }
    },
    token: {
        type: String
    }
}); 

playerSchema.methods.toJSON = function() {
    const player = this.toObject();

    delete player.password; 
    delete player.token; 

    return player; 
}

playerSchema.statics.findByCredentials = async (email, password) => {
    const user = await Player.findOne({ email});
    if(!user) {
        throw new Error("Wrong username / Password"); 
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if(!isMatch) {
        throw new Error("Wrong username / Password"); 
    }

    return user; 
}

playerSchema.methods.getToken = async function () {
    const player = this; 
    console.log(player); 
    const token = await jwt.sign({ _id: player._id.toString() }, tokenSecret, {expiresIn: "300s"});

    player.token = token; 
    await player.save(); 

    return token; 
}

playerSchema.pre("save", async function(next) {
    const player = this; 

    if(player.isModified("password")) {
        player.password = await bcrypt.hash(player.password, 8); 
    }

    next(); 
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;