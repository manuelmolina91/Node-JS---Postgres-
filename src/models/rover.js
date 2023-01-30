const Sequelize = require('sequelize');
const db = require('../services/db')

const Rover = db.define('Rovers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    img_src: {
        type: Sequelize.STRING,
        allowNull: false
    },
    earth_date: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Rover