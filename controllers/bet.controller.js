const express = require('express');
const router = express.Router()
const betService = require('../services/bet.service.js')
// const authenticate = require('../helpers/authenticate')

const Bet = require('../models/Bet')
router.post('/:game_id', createBet)
router.put('/:id', updateBet)
// router.get('/:id', findBetById)

function createBet(req, res, next) {
    betService.create(req.params.game_id, req.body)
        .then(game => {
            // req.io.sockets.emit('update-posts')
            res.json(game)
        })
        .catch(err => next(err))
}

function updateBet(req, res, next) {
    betService.update(req.params.id, req.body)
        .then(game => {
            // req.io.sockets.emit('update-posts')
            req.io.sockets.emit('update-bets')
            res.json(game)
        })
        .catch(err => next(err))
}

function findBetById(req, res, next) {
    betService.findById(req.params.id)
        .then(bet => {
            // req.io.sockets.emit('update-posts')
            // req.io.sockets.emit('update-bets')
            res.json(bet)
        })
        .catch(err => next(err))
}


module.exports = router