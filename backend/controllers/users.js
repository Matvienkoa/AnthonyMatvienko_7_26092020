const models = require('../models/index');
const fs = require('fs');

exports.modifyUser = (req, res) => {
    if (req.body.username == "") {
        return res.status(400).json({ message: "Merci de renseigner un nom d'utilisateur"});
    }
    models.Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.update({
                    username: req.body.username,
                    poste: req.body.poste
            })
            .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
            .catch(error => res.status(400).json({ error }));
        });
};

exports.deleteUser = (req, res) => {
    models.Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            let filename = user.imageUrl.split('/images/')[1];
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
        });
        models.Users.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
            .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
    models.Users.findOne({ 
        include: [{
            model: models.Posts,
            attributes: ['title', 'id']
        }],
        where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res) => {
    models.Users.findAll()
        .then((users) => { res.send(users)})
        .catch(error => res.status(400).json({ error }));
};

exports.uploadAvatar = async (req, res) => {
    const user = await models.Users.findOne({ 
        where: { id: req.params.id } 
    })
    await user.update(
        {
            imageUrl: req.file ? 
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            :null 
        }
    )
    .then(() => res.status(200).json({ message: 'Avatar ajouté' }))
    .catch(error => res.status(400).json({ error }));   
};

