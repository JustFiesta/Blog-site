const express = require("express");
const router = express.Router();

router.get('/about', (req, res) => {
    res.render('about')
})

// we can now use router in all of our module
module.exports = router
