const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'tatakaetatakae', {
    host: 'localhost', 
    dialect: 'mysql'
})

module.exports = connection;