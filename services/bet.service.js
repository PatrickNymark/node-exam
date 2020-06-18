
const Bet = require('../models/Bet');
const Game = require('../models/Game');

module.exports = {
    create,
    update,
    findById,
    findByIds,
    findByGame
}

/**
 * Create new Bet
 * @param {object} betData a object representing a Bet
 * @returns a Promise or exception  
 */
async function create(gameId, betData) {
    betData.game_id = gameId;
    return await new Bet(betData).save().then(bet => {
        return Game.findByIdAndUpdate(gameId, { $push: { bets: bet._id}})
    });
}

/**
 * Update bet
 * @param {object} betData a object representing a Bet
 * @returns a Promise or exception  
 */
async function update(id, betData) {
    return await Bet.findByIdAndUpdate(id, betData)
    // return await new Bet(betData).save().then(bet => {
    //     return Game.findByIdAndUpdate(gameId, { $push: { bets: bet._id}})
    // });
}

/**
 * Find bet by ID
 * @param {id} string a representing a bets id
 * @returns a Promise or exception  
 */
async function findById(id) {
    return await Bet.findById(id)
}

/**
 * Find muliple by ids, populated connected game
 * @param {object} betData a object representing a Bet
 * @returns a Promise or exception  
 */
async function findByIds(ids) {
    return await Bet.find().populate('game_id').where('_id').in(ids)
}

async function findByGame(id) {
    return await Bet.find({ game_id: id})
}