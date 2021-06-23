const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const multerImage = require('../middleware/multerImage');           //Middleware Management Images
const { checkJWT, checkUser } = require('../middleware/auth');      //Middlewares Check User and Auth

router.get('/:id', checkJWT, checkUser, usersCtrl.getOneUser);
router.put('/:id', checkJWT, checkUser, usersCtrl.modifyUser);
router.get('/', checkJWT, checkUser, usersCtrl.getAllUsers);
router.delete('/:id', checkJWT, checkUser, multerImage, usersCtrl.deleteUser);

router.post('/:id/upload', checkJWT, checkUser, multerImage, usersCtrl.uploadAvatar);

module.exports = router;