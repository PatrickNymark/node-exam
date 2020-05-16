const express = require('express');
const router = express.Router()
const authService = require('../services/auth.service')

router.post('/login', login)
router.post('/register', register)

function login(req, res, next) {
    authService.login(req.body)
        .then(user => {
            req.session.user = user._id;
            req.session.save();
            user.isAuthenticated = true

            res.json(user)
        })
        .catch(err => next(err))
}

function register(req, res, next) {
    authService.register(req.body)
        .then(user => {
            req.session.user = user.id
            req.session.save()
            user.isAuthenticated = true
            
            res.json(user)
        })
        .catch(err => next(err))
}

module.exports = router