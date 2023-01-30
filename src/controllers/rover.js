const Rover = require('../models/rover')

const getRoversList = async () => {
    const rovers = await Rover.findAll()
    return rovers
}

const getRoversById = async (id) => {
    const rover = await Rover.findByPk(id)
    return rover
}

const createRover = async ({ id, img_src, earth_date }) => {
    const rover = Rover.create({ id, img_src, earth_date })
    return rover
}

const updateRover = async (id, data) => {
    const rover = await Rover.update(data, {
        where: {
            id
        }
    })
    await rover
}

const removeRover = async (id) => {
    await Rover.destroy({
        where: {
            id
        }
    })
    
    return true
}

module.exports = {
    getRoversList,
    getRoversById,
    createRover,
    updateRover,
    removeRover
}