const express = require('express');
const router = express.Router()
const betService = require('../services/bet.service.js')

router.post('/:game_id', createBet)
router.put('/:id', updateBet)

function createBet(req, res, next) {
    betService.create(req.params.game_id, req.body)
        .then(game => {
            req.io.sockets.emit('update-bets')
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

module.exports = router