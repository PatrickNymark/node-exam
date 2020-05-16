
const bcrypt = require('bcrypt')

const User = require('../models/User');

module.exports = {
  login,
  register
}

/**
 * Login user 
 * @param {object} userData a object containing email and password
 * @returns a Promise or exception  
 */
async function login(userData) {
    const user = await User.findOne({ email: userData.email })

    if(!user) {
        throw `User '${userData.email}' not found`
    }

    if(user && bcrypt.compareSync(userData.password, user.password)) {
        const { password, ...userWithOutPass } = user.toObject();
        
        return {
          ...userWithOutPass
        }
    }

    throw `Password incorrect`
}

/**
 * Register user 
 * @param {object} userData a object representing a user
 * @returns a Promise or exception  
 */
async function register(userData) {
    if(await User.findOne({ email: userData.email })) {
        throw `User '${userData.email}' already exists`
    }

    const newUser = new User(userData)
    return newUser.save();

}

