const routerUser = require('express').Router()
const { toggleNasaToFavorite } = require('../controllers/user')

routerUser.post('/toggle/datas/idNasa', async (request, response) => {
    try {
        const {idNasa} = request.params
        console.log(data)
        const user = await toggleNasaToFavorite({
            idNasa: request.user.id,
            idNasa
        })
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json('Favorite creation failed')
    }
})

module.exports = routerUser