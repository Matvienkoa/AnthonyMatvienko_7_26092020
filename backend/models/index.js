const Comments = require('./Comments');
const Likes = require('./Likes');
const Posts = require('./Posts');
const Users = require('./Users');

Posts.belongsTo(Users);
Posts.hasMany(Comments);
Posts.hasMany(Likes);
Users.hasMany(Posts);
Users.hasMany(Comments);
Users.hasMany(Likes);
Comments.belongsTo(Posts);
Comments.belongsTo(Users);
Likes.belongsTo(Users);
Likes.belongsTo(Posts);
