const Sequelize = require('sequelize');
const db = require('../config/config');

const Likes = db.define('likes', {
    likes: {
        type: Sequelize.NUMBER
    },
    postId: {
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Likes;