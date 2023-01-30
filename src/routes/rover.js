const router = require('express').Router()
const {getRoversList, getRoversById, updateRover, removeRover, createRover } = require('../controllers/rover')

router.get('/', async (request, response) => {
    try {
        const rovers = await getRoversList()
        response.status(200).json({rovers, user: request.user})
    } catch (error) {
        response.status(500)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const rover = await getRoversById(id)
        response.status(200).json(rover)
    } catch (error) {
        response.status(500)
    }
})

router.post('/', async (request, response) => {
    try {
        const data = request.body
        const rover = await createRover(data)
        response.status(200).json(rover)
    } catch (error) {
        response.status(500)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const rover = await updateRover(id, data)
        response.status(200).json(rover)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeRover(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})

module.exports = router