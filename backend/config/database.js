const { Sequelize } = require('sequelize');

module.exports = new Sequelize('groupomania', 'root', 'Rdwxtdb53', {
    host: 'localhost',
    dialect: 'mysql',
});