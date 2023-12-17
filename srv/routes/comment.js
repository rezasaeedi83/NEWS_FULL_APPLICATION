const express = require('express');
const commentController = require('../controller/comment');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post(
  '/list',
  commentController.getComments
);

router.put(
  '/add',
  verifyToken,
  commentController.addComment
);
router.delete(
  '/delete',
  verifyToken,
  commentController.deleteComment
);

module.exports = router;