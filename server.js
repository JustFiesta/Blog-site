const express = require("express");
const blogRouter = require("./routes/blog");
const contactRouter = require("./routes/contact");
const about_meRouter = require("./routes/about_me");
const path = require("path");
const req = require("express/lib/request");

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
  const posts = [
    {
    title: "lorem ipsum",
    date: Date.now(),
    description: "dolor sit amet"
    },
    {
    title: "lorem ipsum 2",
    date: Date.now(),
    description: "dolor sit amet 2"
    },
    {
    title: "lorem ipsum 3",
    date: Date.now(),
    description: "dolor sit amet 3"
    }
  ]
  // render in index.ejs file variable named posts, witch contains all posts
  res.render('index', { posts: posts });
});


// prints a terminal message if server is working
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
