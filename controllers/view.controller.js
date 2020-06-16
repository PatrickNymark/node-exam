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

router.get('/posts', (req, res) => {
    res.sendFile(rootPath + '/public/posts.html')
})

router.get('/games', (req, res) => {
    res.sendFile(rootPath + '/public/games.html')
})

router.get('/games/:id', (req, res) => {
    res.sendFile(rootPath + '/public/game.html')
})

router.get('/coupon', (req, res) => {
    res.sendFile(rootPath + '/public/coupon.html')
})


module.exports = router