const Comments = require('../models/Comments');

exports.createComment = (req, res) => {
    Comments.create({
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'Comment créé !' }))
    .catch(error => res.status(400).json({ error })); 
};

exports.modifyComment = (req, res) => {
    Comments.update(
        {
            content: req.body.content
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(() => res.send("commentaire modifié"))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res) => {
    Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.send("commentaire supprimé"))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res) => {
    Comments.findOne({ where: { id: req.params.id } })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res) => {
    Comments.findAll()
        .then((comments) => {
            res.send(comments)
        })
        .catch(error => res.status(400).json({ error }));
};