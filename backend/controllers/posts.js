const Posts = require('../models/Posts');
const jwt = require('jsonwebtoken');

exports.createPosts = (req, res, next) => {
    /*const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;*/
    let userId = req.body.userId
    Posts.create({
        title: req.body.title,
        content: req.body.content,
        userId: userId
    })
    .then((post) => res.status(201).json({ post }))
    .catch(error => res.status(400).json({ error }));    
};

exports.modifyPost = (req, res, next) => {
    Posts.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(() => res.send("post modifié"))
    .catch(error => res.status(403).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Posts.destroy({ where: { id: req.params.id } })
    .then(() => res.send("post supprimé"))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Posts.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    Posts.findAll()
        .then((posts) => {
            res.send(posts)
        })
        .catch(error => res.status(400).json({ error }));
};