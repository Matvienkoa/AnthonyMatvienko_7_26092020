const Sequelize = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        unique: 'email'
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    }
});

module.exports = Users;


