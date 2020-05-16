const express = require('express');
const router = express.Router()
const postService = require('../services/post.service')
const authenticate = require('../helpers/authenticate')

router.get('/', authenticate, getAllPieces)
router.post('/', createPost)

function getAllPieces(req, res, next) {
    postService.find()
        .then(posts => res.json(posts))
        .catch(err => next(err))
}

function createPost(req, res, next) {
    postService.create(req.body)
        .then(post => res.json(post))
        .catch(err => next(err))
}

module.exports = router