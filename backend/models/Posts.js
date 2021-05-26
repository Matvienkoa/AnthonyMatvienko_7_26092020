const Sequelize = require('sequelize');
const db = require('../config/database');

const Posts = db.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Posts;



