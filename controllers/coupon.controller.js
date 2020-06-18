const express = require('express');
const router = express.Router()
const couponService = require('../services/coupon.service.js')
const authenticate = require('../middleware/authenticate')

router.get('/:user_id', authenticate, findAllFinishedByUser);

function findAllFinishedByUser(req, res, next) {
    couponService.findFinishedByUser(req.params.user_id)
        .then(coupons => {
            res.json(coupons)
        })
        .catch(err => next(err))
}



module.exports = router