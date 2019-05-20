const mongoose = require("mongoose"); 
const validator = require("validator"); 
const bcrypt = require("bcrypt");

const playerSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        trim: true
    },
    email: {
        type: String, 
        require: true, 
        trim: true, 
        lowercase: true, 
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
    }
}); 

playerSchema.pre("save", async function(next) {
    const player = this; 

    if(player.isModified("password")) {
        player.password = await bcrypt.hash(player.password, 8); 
    }

    next(); 
})

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;