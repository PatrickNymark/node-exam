const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Bet = require('./Bet.js')

const GameSchema = new Schema({
    home: String,
    away: String,
    bets: [{ type: Schema.Types.ObjectId, ref: 'bet'}],
    finished: {
        type: Boolean,
        default: false
    },
    kick_off: {
        type: Date,
        required: true
    },
    league: String
}, 
{ 
    timestamps: true 
});

module.exports = Game = mongoose.model("game", GameSchema);
