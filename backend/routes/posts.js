const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const likesCtrl = require('../controllers/likes');
const Auth = require('../middleware/auth');
const multerImage = require('../middleware/multerImage');

router.get('/', Auth, postsCtrl.getAllPosts);
router.post('/', Auth, multerImage, postsCtrl.createPosts);
router.get('/:id', Auth, postsCtrl.getOnePost);
router.put('/:id', Auth, multerImage, postsCtrl.modifyPost);
router.delete('/:id', Auth, multerImage, postsCtrl.deletePost);

router.post('/:postId/like', Auth, likesCtrl.likePost);
router.delete('/:postId/like/:id', likesCtrl.deleteLike);

router.get('/:postId/comment', Auth, commentsCtrl.getAllComments);
router.post('/:postId/comment', Auth, commentsCtrl.createComment);
router.get('/:postId/comment/:id', Auth, commentsCtrl.getOneComment);
router.put('/:postId/comment/:id', Auth, commentsCtrl.modifyComment);
router.delete('/:postId/comment/:id', Auth, commentsCtrl.deleteComment);


module.exports = router;