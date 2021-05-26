const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');
const likesCtrl = require('../controllers/likes');
const {requireAuth} = require('../middleware/auth');

router.get('/', postsCtrl.getAllPosts);
router.post('/', requireAuth, postsCtrl.createPosts);
router.get('/:id', postsCtrl.getOnePost);
router.put('/:id', requireAuth, postsCtrl.modifyPost);
router.delete('/:id', requireAuth, postsCtrl.deletePost);

router.post('/:id/like', requireAuth, likesCtrl.likePost);

router.get('/:id/comment', commentsCtrl.getAllComments);
router.post('/:id/comment', requireAuth, commentsCtrl.createComment);
router.get('/:id/comment/:id', commentsCtrl.getOneComment);
router.put('/:id/comment/:id', requireAuth, commentsCtrl.modifyComment);
router.delete('/:id/comment/:id', requireAuth, commentsCtrl.deleteComment);


module.exports = router;