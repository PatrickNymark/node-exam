
const bcrypt = require('bcrypt')
const User = require('../models/User');

module.exports = {
  deposit,
  withdraw
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

/**
 * Withdraw amount from user 
 * @param {string} id representing authenticated users id
 * @param {number} the amount to withdraw from users account
 * @returns a Promise or exception  
 */
async function withdraw(id, amount) {
  return User.findOneAndUpdate({ _id: id }, { $inc: { balance: -amount }})
}

