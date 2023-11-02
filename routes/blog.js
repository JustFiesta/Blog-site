const express = require("express");
const router = express.Router();
const fs = require("fs");
const { marked } = require("marked");
const path = require("path");
const fm = require("front-matter");

let maxPosts = 6;

// route for getting all markdown files on entrance
router.get('/blog', (req, res) => {

  const postsDir = path.join(__dirname, "../public/posts");
  const posts = [];

  fs.readdirSync(postsDir).forEach((file) => {
    if (file.endsWith(".md")) {
      const postPath = path.join(postsDir, file);
      const content = fs.readFileSync(postPath, "utf8");
      const post = fm(content); // getting front matter from markdown
      posts.push({
        title: post.attributes.title, // getting front matter
        date: new Date(post.attributes.date),
        excerpt: post.attributes.excerpt,
        coverImage: `${post.attributes.cover_image}`,
        content: marked(post.body), // parsing markdown body
        filename: path.parse(file).name
      });
    }
  });

  // Sort posts by date in descending order
  posts.sort((a, b) => b.date - a.date);

  maxPosts = 6;

  res.render('blog', { posts: posts, maxPosts: maxPosts });
})

// for "loading" more posts
router.post('/blog', (req, res) => {

  maxPosts += 3;

  const postsDir = path.join(__dirname, "../public/posts");
  const posts = [];

  fs.readdirSync(postsDir).forEach((file) => {
    if (file.endsWith(".md")) {
      const postPath = path.join(postsDir, file);
      const content = fs.readFileSync(postPath, "utf8");
      const post = fm(content); // getting front matter from markdown
      posts.push({
        title: post.attributes.title, // getting front matter
        date: new Date(post.attributes.date),
        excerpt: post.attributes.excerpt,
        coverImage: `${post.attributes.cover_image}`,
        content: marked(post.body), // parsing markdown body
        filename: path.parse(file).name
      });
    }
  });

  // Sort posts by date in descending order
  posts.sort((a, b) => b.date - a.date);

  res.render('blog', { posts: posts, maxPosts: maxPosts });
})

// funkcja parsująca md do html do poprawy - ścieżki (markdown path)
router.get('/blog/:filename', (req, res) => {
  const filename = req.params.filename;
  const markdownPath = `./public/posts/${filename}.md`;

  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      console.log('File not found');
      res.status(404).send('File not found');
    } else {
      const post = fm(data);
    
      res.render('post', { title: post.attributes.title , content: marked(post.body) });
    }
  });
});


// we can now use router in all of our modules
module.exports = router
