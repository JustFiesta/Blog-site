const express = require("express");
const router = express.Router();
const fs = require("fs");
const { marked } = require("marked");
const path = require("path");
const fm = require("front-matter");

router.get('/post/:filename', (req, res) => {
    const filename = req.params.filename;
    const markdownPath = `public/posts/${filename}.md`;
  
    fs.readFile(markdownPath, 'utf8', (err, data) => {
      if (err) {
        res.status(404).send('File not found');
      } else {
        const post = fm(data);
        res.render('post', { post: post, content: marked(post.body) });
      }
    });
  });
router.get('/blog', (req, res) => {
    res.render('blog');
})

// we can now use router in all of our module
module.exports = router
