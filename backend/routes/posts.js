const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const likesCtrl = require('../controllers/likes');
const Auth = require('../middleware/auth');
const multerImage = require('../middleware/multerImage');

router.get('/', postsCtrl.getAllPosts);
router.post('/', multerImage, postsCtrl.createPosts);
router.get('/:id', postsCtrl.getOnePost);
router.put('/:id', multerImage, postsCtrl.modifyPost);
router.delete('/:id', multerImage, postsCtrl.deletePost);

router.post('/:postId/like', Auth, likesCtrl.likePost);

router.get('/:postId/comment', commentsCtrl.getAllComments);
router.post('/:postId/comment', commentsCtrl.createComment);
router.get('/:postId/comment/:id', commentsCtrl.getOneComment);
router.put('/:postId/comment/:id', commentsCtrl.modifyComment);
router.delete('/:postId/comment/:id', commentsCtrl.deleteComment);


module.exports = router;