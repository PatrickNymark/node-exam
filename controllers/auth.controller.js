const express = require('express');
const router = express.Router()
const authService = require('../services/auth.service')
const authenticate = require('../middleware/authenticate')

router.post('/login', login)
router.post('/register', register)
router.get('/current', authenticate, current)
router.get('/logout', logout)

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
            req.session.user = user._id
            req.session.save()
            user.isAuthenticated = true

            res.json(user)
        })
        .catch(err => next(err))
}

function logout(req, res, next) {
    req.session.destroy()
    res.redirect('/login')
}

function current(req, res, next) {
    authService.current(req.session.user)
        .then(user => {
            res.json(user)
        })
        .catch(err => next(err))
}

module.exports = router