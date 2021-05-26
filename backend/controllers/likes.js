const models = require('../models/index');

exports.likePost = (req, res) => {
    models.Likes.create({
        likes: req.body.likes,
        userId: req.body.userId,
        postId: req.params.postId
    })
    .then(() => res.status(201).json({ message: 'like ajouté !' }))
    .catch(error => res.status(400).json({ error }));   
};