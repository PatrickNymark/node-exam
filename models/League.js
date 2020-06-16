const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
    name: String,
    games: [{ type: Schema.Types.ObjectId, ref: 'game'}],
}, 
{ 
    timestamps: true 
});

module.exports = League = mongoose.model("league", LeagueSchema);
