// Create web server using express
// Create a route for /comments
// Create a GET route for /comments
// Create a POST route for /comments
// Create a DELETE route for /comments

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');
const uuid = require('uuid/v4');

// GET Route for /comments
router.get('/', (req, res) => res.json(comments));

// POST Route for /comments
router.post('/', (req, res) => {
  const newComment = {
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    body: req.body.body
  };

  if (!newComment.name || !newComment.email || !newComment.body) {
    return res.status(400).json({ msg: 'Please include a name, email, and body' });
  }

  comments.push(newComment);
  res.json(comments);
});

// DELETE Route for /comments
router.delete('/:id', (req, res) => {
  const found = comments.some(comment => comment.id === req.params.id);

  if (found) {
    res.json({
      msg: 'Comment deleted',
      comments: comments.filter(comment => comment.id !== req.params.id)
    });
  } else {
    res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
  }
});

module.exports = router;