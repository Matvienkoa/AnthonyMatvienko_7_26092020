const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const multerImage = require('../middleware/multerImage');
const Auth = require('../middleware/auth');

router.get('/:id', Auth, usersCtrl.getOneUser);
router.put('/:id', Auth, usersCtrl.modifyUser);
router.get('/', Auth, usersCtrl.getAllUsers);
router.delete('/:id', Auth, multerImage, usersCtrl.deleteUser);

router.post('/:id/upload', Auth, multerImage, usersCtrl.uploadAvatar);

module.exports = router;