const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

const controlAuthentication = async (request, response, next) => {
    if(request.path.includes('/auth')) {
        return next()
    }
    if (!request.headers.authorization) {
        return response.status(403).json('Quiet! You are not autheticaction')
    }

    const token = request.headers.authorization.split(" ")[1]

    if(!token) {
        return response.status(403).json('Quiet! Wrong token')
    }

    const load = jsonwebtoken.decode(token, process.env.TOKEN_SECRET)

    if(!load || !load.email) {
        return response.status(403).json('SORRY! Wrong token')
    }

    const user = await User.findOne({email: load.email})

    if(!user) {
        return response.status(403).json('WOW! Wrong token')
    }

    request.user = {id: user.id, email: user.email}

    next()
}

module.exports = {
    controlAuthentication
}