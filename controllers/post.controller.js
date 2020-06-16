const express = require('express');
const router = express.Router()
const postService = require('../services/post.service')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, getAllPosts)
router.post('/', createPost)

function getAllPosts(req, res, next) {
    postService.find()
        .then(posts => res.json(posts))
        .catch(err => next(err))
}

function createPost(req, res, next) {
    postService.create(req.body)
        .then(post => {
            req.io.sockets.emit('update-posts')
            res.json(post)
        })
        .catch(err => next(err))
}


module.exports = router