const User = require('../models/user')

const getUserByEmail = async (email) => {
    return User.findOne({where: { email }})
}

const toggleNasaToFavorite = async ({id, idNasa}) => {
    const user = await getUserById(id)
    const currentFavList = user.nasaFavs
    let newFavsList = currentFavList

    const existed = currentFavList.includes(idNasa)

    if (existed) {
        newFavsList = currentFavList.filter(item => item === idNasa)
    } else {
        newFavsList.push(idNasa)
    }

    await user.updateOne({nasaFavs: newFavsList})

    return getUserById(id)
}

module.exports = {
    getUserByEmail,
    toggleNasaToFavorite
}