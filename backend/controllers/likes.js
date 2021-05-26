const Likes = require('../models/Likes');
const jwt = require('jsonwebtoken');

exports.likePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Likes.create({
        likes: req.body.likes,
        userId: userId,
        postId: req.params.id
    })
    .then(() => res.status(201).json({ message: 'like ajouté !' }))
    .catch(error => res.status(400).json({ error }));   
};