
const Game = require('../models/Game');

module.exports = {
    create,
    find,
    findById
}

/**
 * Create new game
 * @param {object} gameData a object representing a game
 * @returns a Promise or exception  
 */
async function create(gameData) {
    if(await Game.findOne({ home: gameData.home, away: gameData.away })) {
        throw `Game '${gameData.home}' vs '${gameData.away}' already exists`
    }

	const newGame = new Game(gameData);
	return await newGame.save(); 
}

/**
 * Find all games
 * @returns a Promise or exception  
 */
async function find() {
    return await Game.find();    
}

/**
 * Find single game, populated with the connected bets
 * @param {string} id representing a games id
 * @returns a Promise or exception  
 */
async function findById(id) {
    return await Game.findById(id).populate('bets');    
}
