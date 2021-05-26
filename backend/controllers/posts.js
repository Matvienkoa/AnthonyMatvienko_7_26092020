const models = require('../models/index');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createPosts = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //const userId = decodedToken.userId;
    models.Posts.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        imageUrl: req.file ? 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        :null
    })
    .then(() => res.status(201).json({ message: 'Post Créé' }))
    .catch(error => res.status(400).json({ error }));    
};

exports.modifyPost = async (req, res, next) => {   
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

exports.deletePost = (req, res, next) => {
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

exports.getOnePost = (req, res, next) => {
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

exports.getAllPosts = (req, res, next) => {
    models.Posts.findAll({
        order: [['createdAt', 'DESC']],
        include: [{
            model: models.Users,
            attributes: ['username', 'imageUrl']
        },{
            model: models.Likes,
            attributes: ['likes']
        },{
            model: models.Comments,
            attributes: ['content']
        }]
    })
        .then((posts) => {res.send(posts)})
        .catch(error => res.status(400).json({ error }));
};