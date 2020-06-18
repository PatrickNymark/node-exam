const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require('./Game')

const BetSchema = new Schema({
    type: String,
    home: {
        title: String,
        odds: Number,
        won: {
            type: Boolean,
            default: false
        }
    },
    x: {
        title: String,
        odds: Number,
        won: {
            type: Boolean,
            default: false
        }
    },
    away: {
        title: String,
        odds: Number,
        won: {
            type: Boolean,
            default: false
        }
    },
    game_id: {
        type: Schema.Types.ObjectId,
        ref: 'game', 
        required: true
    },
    finished: {
        type: Boolean,
        default: false
    }
}, 
{ 
    timestamps: true 
});


module.exports = Bet = mongoose.model("bet", BetSchema);
