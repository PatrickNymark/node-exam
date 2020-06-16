const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require('./Game')

const BetSchema = new Schema({
    type: String,
    home: {
        title: String,
        odds: Number
    },
    x: {
        title: String,
        odds: Number
    },
    away: {
        title: String,
        odds: Number
    },
    game_id: {
        type: Schema.Types.ObjectId,
        ref: 'game', 
        required: true
    }
}, 
{ 
    timestamps: true 
});


module.exports = Bet = mongoose.model("bet", BetSchema);
