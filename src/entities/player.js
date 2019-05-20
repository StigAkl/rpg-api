const mongoose = require("mongoose"); 
const validator = require("validator"); 

const Player = mongoose.model("Player", {
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

module.exports = Player;