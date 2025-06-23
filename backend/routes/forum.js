const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

// POST a forum post
router.post('/', async (req, res) => {
  try {
    const { content, postedBy } = req.body;
    const newPost = new ForumPost({ content, postedBy });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: 'Failed to post to forum' });
  }
});

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// DELETE post (only by creator)
router.delete('/:id', async (req, res) => {
  try {
    const { postedBy } = req.body;
    const post = await ForumPost.findById(req.params.id);

    if (!post || post.postedBy !== postedBy) {
      return res.status(403).json({ error: 'Unauthorized delete' });
    }

    await ForumPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// PUT edit post
router.put('/:id', async (req, res) => {
  try {
    const { postedBy, content } = req.body;
    const post = await ForumPost.findById(req.params.id);

    if (!post || post.postedBy !== postedBy) {
      return res.status(403).json({ error: 'Unauthorized edit' });
    }

    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

module.exports = router;
