const express = require('express');
const router = express.Router()
const userService = require('../services/user.service')
// const authenticate = require('../middleware/authenticate')

router.post('/add', addDeposit)

function addDeposit(req, res, next) {
    console.log(req.body)
    userService.deposit(req.session.user, req.body.amount)
        .then(user => res.json(user))
        .catch(err => next(err))
}


module.exports = router