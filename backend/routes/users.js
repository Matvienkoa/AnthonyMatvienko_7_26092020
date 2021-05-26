const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const multerImage = require('../middleware/multerImage');
const Auth = require('../middleware/auth');

router.get('/:id', usersCtrl.getOneUser);
router.put('/:id', usersCtrl.modifyUser);
router.get('/', usersCtrl.getAllUsers);
router.delete('/:id', multerImage, usersCtrl.deleteUser);

router.post('/:id/upload', multerImage, usersCtrl.uploadAvatar);

module.exports = router;