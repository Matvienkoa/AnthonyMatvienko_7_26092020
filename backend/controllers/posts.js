const models = require('../models/index');
const fs = require('fs');

// Create Post
exports.createPosts = (req, res) => {
    // Empty Inputs
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    models.Posts.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        imageUrl: req.file ? 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        :null
    })
    .then(() => res.status(201).json(req.body))
    .catch(error => res.status(400).json({ error }));    
};

// Edit Post
exports.modifyPost = async (req, res) => {   
    // Empty Inputs
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    const post = await models.Posts.findOne({
        where: { id: req.params.id }
    })
    await post.update(
        {
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.file ? 
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            :null
        }
    )
    .then(() => res.status(200).json({ message: 'Post modifié' }))
    .catch(error => res.status(400).json({ error }));       
};

// Delete Post
exports.deletePost = (req, res) => {
    models.Posts.findOne({ where: { id: req.params.id } })
        .then(post => {
            let filename = post.imageUrl.split('/images/')[1];
            if (filename !== undefined) {
                fs.unlink(`images/${filename}`,
                    function (err) {
                        if (err) {
                            console.log('error');
                        } else {
                            console.log('fichier supprimé');
                        }
                    },
                );
            }
        })
    models.Posts.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

// Get One Post
exports.getOnePost = (req, res) => {
    models.Posts.findOne({
        include: [{
            model: models.Users,
            attributes: ['username']
        },{
            model: models.Likes,
            attributes: ['likes']
        },{
            model: models.Comments,
            attributes: ['content']
        }],
        where: { id: req.params.id }})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// Get All Posts
exports.getAllPosts = (req, res) => {
    models.Posts.findAll({
        order: [['createdAt', 'DESC']],
        include: [{
            model: models.Users,
            attributes: ['username', 'imageUrl']
        },{
            model: models.Likes,
            attributes: ['likes', 'postId', 'userId','id']
        },{
            model: models.Comments,
            attributes: ['content']
        }]
    })
        .then((posts) => {res.send(posts)})
        .catch(error => res.status(400).json({ error }));
};