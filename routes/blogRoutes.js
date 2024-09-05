const express = require('express');
const router = express.Router();
const blogController = require('../controllers/Blog.controller');
const authenticateToken = require('../middlewares/authMiddleware');
const uploader  = require("../middlewares/uploader");

router.post('/', authenticateToken,uploader.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.get('/user/:userId', blogController.getBlogsByUser);
router.put('/:id', authenticateToken, blogController.updateBlog);
router.delete('/:id', authenticateToken, blogController.deleteBlog);
router.post('/:id/comments', authenticateToken, blogController.addComment);
router.post('/:id/like', authenticateToken, blogController.likeBlog);

module.exports = router;
