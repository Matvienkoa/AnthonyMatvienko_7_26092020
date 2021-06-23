const models = require('../models/index');

// Create Comment
exports.createComment = (req, res) => {
    // Empty Inputs
    if (req.body.content == "") {
        return res.status(400).json({ message: "Merci de renseigner un commentaire"});
    }
    models.Comments.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.postId
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error })); 
};

// Edit Comment
exports.modifyComment = (req, res) => {
    models.Comments.update(
        {
            content: req.body.content
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
    .catch(error => res.status(400).json({ error }));
};

// Delete Comment
exports.deleteComment = (req, res) => {
    models.Comments.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
    .catch(error => res.status(400).json({ error }));
};

// Get One Comment
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

// Get All Comments
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