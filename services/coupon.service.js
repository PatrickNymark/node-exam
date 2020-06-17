
const Bet = require('../models/Bet');
const Coupon = require('../models/Coupon');

module.exports = {
    create,
    findByUser,
    findActiveByUser
}

/**
 * Create new Coupon
 * @param {object} couponData a object representing a Coupon
 * @returns a Promise or exception  
 */
async function create(couponData) {
    return new Coupon(couponData).save();
}

/**
 * Get all coupons by user
 * @param {string} id representing a users id
 * @returns a Promise or exception  
 */
async function findByUser(id) {
    return Coupon.find().where('creator').equals(id)
}

/**
 * Find active coupons by user
 * @param {string} id representing a users id
 * @returns a Promise or exception 
 */
async function findActiveByUser(id) {
    return Coupon.find({ creator: id}).where('finished').equals(false);
}