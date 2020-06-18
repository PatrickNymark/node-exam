const express = require('express');
const router = express.Router()
const gameService = require('../services/game.service.js')
// const authenticate = require('../helpers/authenticate')

router.get('/', getAllGames)
router.post('/', createGame)
router.get('/:id', getSingleGame)
router.post('/finished/:id', setFinished)

function getAllGames(req, res, next) {
    gameService.find()
        .then(games => res.json(games))
        .catch(err => next(err))
}

function getSingleGame(req, res, next) {
    gameService.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err => next(err))
}

function createGame(req, res, next) {
    gameService.create(req.body)
        .then(game => {
            // req.io.sockets.emit('update-posts')
            res.json(game)
        })
        .catch(err => next(err))
}

function setFinished(req, res, next) {
    gameService.finished(req.params.id, req.io)
        .then(game => {
            req.io.sockets.emit('update-coupons')
            res.json(game)
        })
        .catch(err => next(err))
}




module.exports = router