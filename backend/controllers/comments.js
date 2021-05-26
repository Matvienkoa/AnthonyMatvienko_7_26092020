const models = require('../models/index');

exports.createComment = (req, res) => {
    models.Comments.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.postId
    })
    .then(() => res.status(201).json({ message: 'Comment créé !' }))
    .catch(error => res.status(400).json({ error })); 
};

exports.modifyComment = (req, res) => {
    models.Comments.update(
        {
            content: req.body.content
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(() => res.status(200).json({ message: 'Comment modifié' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res) => {
    models.Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Comment supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res) => {
    models.Comments.findOne({ 
        include: [{
            model: models.Users,
            attributes: ['username']
        }],
        where: { id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res) => {
    models.Comments.findAll({ 
        include: [{
            model: models.Users,
            attributes: ['username']
        }],
        where: {postId: req.params.postId } })
        .then((comments) => {res.send(comments)})
        .catch(error => res.status(400).json({ error }));
};