
const bcrypt = require('bcrypt')
const User = require('../models/User');

module.exports = {
  deposit,
}

/**
 * Deposit amount to user 
 * @param {string} id representing authenticated users id
 * @param {number} the amount to desposit to users account
 * @returns a Promise or exception  
 */
async function deposit(id, amount) {
    return User.findOneAndUpdate({ _id: id }, { $inc: { balance: amount }})
}

