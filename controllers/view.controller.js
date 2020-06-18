const express = require('express');
const router = express.Router()
const path = require('path');
const authenticate = require('../middleware/authenticate')

const rootPath = path.dirname(require.main.filename)

router.get('/', (req, res) => {
    res.sendFile(rootPath + '/public/index.html')
})

router.get('/login', (req, res) => {
    res.sendFile(rootPath + '/public/login.html')
})

router.get('/register', (req, res) => {
    res.sendFile(rootPath + '/public/register.html')
})

router.get('/dashboard', authenticate,(req, res) => {
    res.sendFile(rootPath + '/public/dashboard.html')
})

router.get('/games', authenticate, (req, res) => {
    res.sendFile(rootPath + '/public/games.html')
})

router.get('/games/:id', authenticate, (req, res) => {
    res.sendFile(rootPath + '/public/game.html')
})

router.get('/coupon', authenticate, (req, res) => {
    res.sendFile(rootPath + '/public/coupon.html')
})

router.get('/active/:id', authenticate, (req, res) => {
    res.sendFile(rootPath + '/public/active-coupons.html')
})

router.get('/history/:id', authenticate, (req, res) => {
    res.sendFile(rootPath + '/public/history-coupons.html')
})


module.exports = router