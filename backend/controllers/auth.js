const bcryptjs = require('bcryptjs');
const models = require('../models/index');
const jwt = require('jsonwebtoken');
const passwordValidator = require('../middleware/passwordValidator');
const emailValidator = require('email-validator');

exports.signup = (req, res) => {
    if ((!emailValidator.validate(req.body.email)) || (!passwordValidator.validate(req.body.password))) {
        return res.status(400).json({ message: 'Format email/password invalide' });
    }
    bcryptjs.hash(req.body.password, 10)
        .then(hash => {
            models.Users.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                poste: req.body.poste
            })
            .then((user) => res.status(201).json({ user }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    models.Users.findOne({where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcryptjs.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'mdp non trouvé' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};