const express = require('express');
const router = express.Router()
const userService = require('../services/user.service')
// const authenticate = require('../middleware/authenticate')

router.post('/deposit', depositAmount)
router.post('/withdraw', withdrawAmount)

function depositAmount(req, res, next) {
    userService.deposit(req.session.user, req.body.amount)
        .then(user => res.json(user))
        .catch(err => next(err))
}

function withdrawAmount(req, res, next) {
    userService.withdraw(req.session.user, req.body.amount)
        .then(user => res.json(user))
        .catch(err => next(err))
}





module.exports = router