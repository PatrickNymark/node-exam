const express = require('express');
const router = express.Router()
const path = require('path');
const authenticate = require('../helpers/authenticate')

const rootPath = path.dirname(require.main.filename)

router.get('/', (req, res) => {
    res.sendFile(rootPath + '/public/index.html')
})

router.get('/login', (req, res) => {
    res.sendFile(rootPath + '/public/login.html')
})

router.get('/dashboard', authenticate,(req, res) => {
    res.sendFile(rootPath + '/public/dashboard.html')
})

router.get('/posts', (req, res) => {
    res.sendFile(rootPath + '/public/posts.html')
})


module.exports = router