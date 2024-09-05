const express = require('express');
const router = express.Router();
const blogController = require('../controllers/Blog.controller');
const authenticateToken = require('../middlewares/authMiddleware');
const uploader  = require("../middlewares/uploader");

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */


/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Creates a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken,uploader.single('image'), blogController.createBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (20 blogs per page)
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', blogController.getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', blogController.getBlog);


router.get('/user/:userId', blogController.getBlogsByUser);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateToken, blogController.updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, blogController.deleteBlog);

/**
 * @swagger
 * /api/blogs/{id}/comments:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/comments', authenticateToken, blogController.addComment);

/**
 * @swagger
 * /api/blogs/{id}/like:
 *   post:
 *     summary: Like a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *       400:
 *         description: User already liked this blog
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/like', authenticateToken, blogController.likeBlog);

module.exports = router;
