const User = require('../models/user')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { getUserByEmail } = require('../controllers/user')
const saltRounds = 10

const signup = async ({ email, password}) => {
    const existedUser = await getUserByEmail(email)
    console.log(existedUser)
    if (existedUser) {
        throw new Error('User existed');
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ email, password: hashedPassword, salt })

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
}

const login = async ({ email, password }) => {
    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Wrong password')
    }

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
}

module. exports = {
    signup,
    login
}