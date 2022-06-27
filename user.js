const express = require('express');
const router = express.Router();

// login
router.post('/login', function(req, res) {
    let credentials = {
        username: req.body.username,
        password: req.body.password,
    };

    res.json({
        username: req.body.username,
        message: "Login successful"
    });
});

// get current user
router.get('/', function(req, res) {
    res.json({
        username: "admin",
        password: "goodpassword"
    });
});

//logout
router.post('/logout', function(req, res) {
    res.json({
        message: "Logout successful"
    });
});


module.exports = router;