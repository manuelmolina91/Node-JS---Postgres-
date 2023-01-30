const Rover = require ('../models/rover')

const fetchNasaApiRoutes = async () => {

    try {
        console.log('EJECUTANDO GET API')
        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=ZCekXb2vP8wG9Pges0BjwcwhOF3dTzidSkOrl4Em');
        const data = await response.json();

        const roverPhoto = data.photos
        const newList = roverPhoto.map(rover => (
            {
                id: rover.id,
                img_src: rover.img_src,
                earth_date: rover.earth_date
            }));

        //Probamos aquí el código para controlar documentos duplicados
        const itemsToCreate = [];
        const existedItems = await Rover.find();
        for (const item of newList) {
            const existed = existedItems.find((existedItem) => existedItem.id === item.id)
            if (!existed) {
                itemsToCreate.push(item)
            }
        }
        if (itemsToCreate.length > 0) {
            await Rover.insertMany(itemsToCreate);
            console.log('DATOS GUARDADOS EN LA BASE DE DATOS');
        }
        return existedItems.concat(itemsToCreate);
    
       return data
    } catch(error){
        console.log(error)
    }
}

module.exports = fetchNasaApiRoutes