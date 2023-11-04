const express = require("express");
const blogRouter = require("./routes/blog");
const contactRouter = require("./routes/contact");
const about_meRouter = require("./routes/about_me");
const fs = require('fs');
const { marked } = require('marked');
const path = require('path');
const fm = require("front-matter");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// this will create add routes at the end of /posts so i can use static files inside
app.use('/public', express.static('public'))
app.use('/public/images', express.static('public/images'))
app.use('/public/images/favicon.ico', express.static('public/images/favicon.ico'))

// subsite routes (imported above from files)
app.use(blogRouter)
app.use(contactRouter)
app.use(about_meRouter)

// home page route
app.get("/", (req, res) => {
  const postsDir = path.join(__dirname, "public/posts");
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

  res.render("index", { posts: posts });
});

// 404 route - it fires for every single request if nothing above fires first
app.use((req, res) => {
  res.status(404)
  res.render("404");
})

// Listens for requests and prints a terminal message if server is working
app.listen(port, () => {
  console.log(`Blog app listening on port ${port}!`);
});
