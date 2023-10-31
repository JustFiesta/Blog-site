const express = require("express");
const router = express.Router();

router.get('/contact', (req, res) => {
    res.render('contact')
})

// we can now use router in all of our module
module.exports = router
