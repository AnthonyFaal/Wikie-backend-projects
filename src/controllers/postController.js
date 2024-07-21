const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

const postController = { 
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({ include: [User, Comment] });
      if (posts.length === 0) {
        return res.status(200).json({ message: 'No posts found' });
      }
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, { include: [User, Comment] });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createPost: [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title must be a string'),
    body('content')
      .notEmpty()
      .withMessage('Content is required')
      .isString()
      .withMessage('Content must be a string'),
    body('userId')
      .notEmpty()
      .withMessage('User ID is required')
      .isInt()
      .withMessage('User ID must be an integer'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { title, content, userId } = req.body;
        const newPost = await Post.create({ title, content, user_id: userId });
        res.status(201).json(newPost);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    },
  ],

  updatePost: [
    body('title')
      .optional()
      .isString()
      .withMessage('Title must be a string'),
    body('content')
      .optional()
      .isString()
      .withMessage('Content must be a string'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { title, content } = req.body;
        const post = await Post.findByPk(req.params.id);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        res.json(post);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    },
  ],

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = postController;