const router = require('express').Router()
const Rover = require('../models/rover')
const fetchNasaApiRoutes = require('../services/API')
const {getRoversList, getRoversById, updateRover, removeRover, createRover } = require('../controllers/rover')

router.get('/', async (request, response) => {
    try {
        const nasaApi = await fetchNasaApiRoutes()
        console.log(nasaApi.length)
        response.status(200).json(nasaApi)

        nasaApi.photos.forEach(async e => {
            const data = await createRover(e);
        })
        
    } catch (error) {
        response.status(500)
    }
})

module.exports = router