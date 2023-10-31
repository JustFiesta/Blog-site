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

  fs.readdirSync(postsDir).forEach((filename) => {
    if (filename.endsWith(".md")) {
      const postPath = path.join(postsDir, filename);
      const content = fs.readFileSync(postPath, "utf8");
      const post = fm(content);
      posts.push({
        title: post.attributes.title,
        date: new Date(post.attributes.date),
        excerpt: post.attributes.excerpt,
        coverImage: `${post.attributes.cover_image}`,
        content: marked(post.body), // Parsowanie treści Markdown
      });
    }
  });

  // Sort posts by date in descending order
  posts.sort((a, b) => b.date - a.date);

  res.render("index", { posts: posts });
});


// //route for fetching posts by filename
// app.get('/:filename', (req, res) => {
//   const filename = req.params.filename
//   const markdown = `public/posts/${filename}.md`
//   fs.readFile(markdown, 'utf8', (err, data) => {
//     if (err) {
//       res.send('File not found')
//     } else {
//       const html = marked(data.toString())
//       res.send(html)
//     }
//   })
// })

// prints a terminal message if server is working
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});