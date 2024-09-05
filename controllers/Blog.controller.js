const Blog = require("../models/Blog.model");
const cloudinary = require("../middlewares/cloudinary");
const upload = require("../middlewares/uploader");

// Create a new blog
exports.createBlog = async (req, res) => {
  const imgURl = req.file.path;
  const { title, content, category, user } = req.body;
  try {
    const blog = new Blog({ title, content, category, user, image: imgURl });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs [20 per response in a page]
exports.getAllBlogs = async (req, res) => {
    const { page = 1, search = '' } = req.query; 
    const limit = 20;

    try {
        const searchQuery = search ? { $or: [
            { title: { $regex: search, $options: 'i' } }, // search for title
            { content: { $regex: search, $options: 'i' } },  // search for content
            { category: { $regex: search, $options: 'i' } },  // search for category
        ] } : {};

        const blogs = await Blog.find(searchQuery)
            .populate('user', 'username')
            .populate('comments.user', 'username')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalBlogs / limit);

        res.json({
            currentPage: Number(page),
            totalPages,
            totalBlogs,
            blogs
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single blog by its id
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("user", "username")
      .populate("comments.user", "username");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get 20 blogs in a page by a specific user
exports.getBlogsByUser = async (req, res) => {
  const userId = req.params.userId;
  const { page = 1 } = req.query;
  const limit = 20;

  try {
    const blogs = await Blog.find({ user: userId })
      .populate("user", "username")
      .populate("comments.user", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalBlogs / limit);

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.json({
      currentPage: Number(page),
      totalPages,
      totalBlogs,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to the blog
exports.addComment = async (req, res) => {
  const { text, user } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user, text });
    await blog.save();

    res.json({ message: "Comment added successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like a blog
exports.likeBlog = async (req, res) => {
  const { user } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.likes.includes(user)) {
      return res.status(400).json({ message: "User already liked this blog" });
    }

    blog.likes.push(user);
    await blog.save();

    res.json({ message: "Blog liked successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
