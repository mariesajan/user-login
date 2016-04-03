var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/members', ensureAuthenticated, function(req, res, next) {
    res.render('index', {
        title: 'Members'
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You are not logged in..');
    res.redirect('/users/login');
};

//Members page should be veiwed after the login only.. So the home page is setting as Login
router.get('/', function(req, res, next) {
    res.render('login');
});



module.exports = router;
