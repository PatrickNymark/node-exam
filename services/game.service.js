const couponService = require('./coupon.service')

const Game = require('../models/Game');
const Bet = require('../models/Bet')

module.exports = {
    create,
    find,
    findById,
    finished
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

/**
 * Set finished
 */
async function finished(id, io) {
    // await couponService.checkIfFinished(id)
    await Game.findByIdAndUpdate(id, { '$set': { 'finished': true }});
    await Bet.updateMany({ game_id: id }, { '$set': { 'finished': true }})
    await Coupon.updateMany({ 'bets.bet.game_id._id': id} , 
                            { '$set': { 
                                'bets.$.bet.finished': true,
                                'bets.$.bet.game_id.finished': true
                            }})

    const coupons = await Coupon.find({ 'bets.bet.game_id._id': id })
    console.log(coupons)
    for(var i = 0; i < coupons.length; i++) {
        coupons[i].checkIfFinished(finished => {
            if(finished) {
                coupons[i].finished = true
                io.emit('update-coupons')
                return coupons[i].save()
            }
        })
    }

    
}
