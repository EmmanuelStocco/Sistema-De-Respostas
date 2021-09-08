const Sequelize = require('sequelize');

const connection = new Sequelize('projeto', 'root', 'senha', {
    host: 'localhost', 
    dialect: 'mysql'
})

module.exports = connection;
