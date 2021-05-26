const Sequelize = require('sequelize');
const db = require('../config/config');

const Posts = db.define('posts', {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    },
    imageUrl: {
        type: Sequelize.STRING
    }
});

module.exports = Posts;



