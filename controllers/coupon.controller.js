const express = require('express');
const router = express.Router()
const couponService = require('../services/coupon.service.js')
// const authenticate = require('../helpers/authenticate')

router.get('/:user_id', findAllFinishedByUser);
// router.get('/:id', findBetById)

function findAllFinishedByUser(req, res, next) {
    couponService.findFinishedByUser(req.params.user_id)
        .then(coupons => {
            // req.io.sockets.emit('update-posts')
            res.json(coupons)
        })
        .catch(err => next(err))
}



module.exports = router