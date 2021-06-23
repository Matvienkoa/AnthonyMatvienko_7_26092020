const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const likesCtrl = require('../controllers/likes');
const { checkJWT, checkUser } = require('../middleware/auth');  //Middlewares Check User and Auth
const multerImage = require('../middleware/multerImage');       //Middleware Management Images

router.get('/', checkJWT, checkUser, postsCtrl.getAllPosts);
router.post('/', checkJWT, checkUser, multerImage, postsCtrl.createPosts);
router.get('/:id', checkJWT, checkUser, postsCtrl.getOnePost);
router.put('/:id', checkJWT, checkUser, multerImage, postsCtrl.modifyPost);
router.delete('/:id', checkJWT, checkUser, multerImage, postsCtrl.deletePost);

router.post('/:postId/like', checkJWT, checkUser, likesCtrl.likePost);
router.delete('/:postId/like/:id', checkJWT, checkUser, likesCtrl.deleteLike);

router.get('/:postId/comment', checkJWT, checkUser, commentsCtrl.getAllComments);
router.post('/:postId/comment', checkJWT, checkUser, commentsCtrl.createComment);
router.get('/:postId/comment/:id', checkJWT, checkUser, commentsCtrl.getOneComment);
router.put('/:postId/comment/:id', checkJWT, checkUser, commentsCtrl.modifyComment);
router.delete('/:postId/comment/:id', checkJWT, checkUser, commentsCtrl.deleteComment);


module.exports = router;