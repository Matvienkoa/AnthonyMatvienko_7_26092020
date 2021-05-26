const Sequelize = require('sequelize');
const db = require('../config/database');

const Comments = db.define('comments', {
    content: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    },
    PostId: {
        type: Sequelize.INTEGER
    }
});

module.exports = Comments;