const express = require("express");
const router = express.Router();

router.get('/about_me', (req, res) => {
    res.render('about_me')
})

// we can now use router in all of our module
module.exports = router
