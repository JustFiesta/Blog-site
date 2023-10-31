const express = require("express");
const router = express.Router();

router.get('/blog', (req, res) => {
    res.render('blog')
})

// we can now use router in all of our module
module.exports = router
