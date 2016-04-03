var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Register'
    })
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});


mongoose.connect('mongodb://localhost/dbAuth');

var schemaObj = new mongoose.Schema({
    _id: String,
    name: String,
    username: String,
    password: String,
    profileImage: String
});

var userModel = mongoose.model('registration', schemaObj);

var upload = multer({
    dest: '/uploads/'
});

var cpUpload = upload.single('profileImage');

router.post('/registerForm', cpUpload, function(req, res, next) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Enter a valid email id').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('pwd', 'Password is required').notEmpty();
    req.checkBody('confirmPwd', 'Confirm Password is required').notEmpty();
    req.checkBody('confirmPwd', 'Passwords should be matched').equals(
        req.body.pwd);

    if (req.file) {
        // To get the deatils of the uploaded file
        var profileImageOriginalName = req.file.originalname;
        var profileImageMimeType = req.file.mimetype;
        var profileImagePath = req.file.path;
        var profileImageSize = req.file.size;
    } else {
        profileImageOriginalName = 'noImage.jpg';
    }

    var errors = req.validationErrors(); //validates the fields mentioned with the checkBody

    if (errors) {
        // If there are any errors in the values enterd in the fields
        res.render('register', {
            title: 'REGISTER',
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            pwd: req.body.pwd,
            confirmPwd: req.body.confirmPwd,
            profileImage: profileImageOriginalName
        });
    } else {

        var userRec = new userModel({
            _id: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: req.body.pwd,
            profileImage: profileImageOriginalName
        });

        userRec.save('registration', schemaObj);


        //Redirecting to the Hopmepage if there are no errors
        req.flash('success', 'You have successfully registered');
        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy({
    usernameField: 'uname',
    passwordField: 'pwd'
}, function(uname, pwd, done) {
    userModel.findOne({
        username: uname
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Invalid username'
            });
        }
        if (user) {
            if (user.password != pwd) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user,{
              message: 'Welcome!!'
            });
        }
    });
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
        done(err, user);
    });
});
router.post('/loginForm', passport.authenticate('local', {
    successRedirect: '/members',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You are logged out.');
    res.redirect('/users/login');
});

module.exports = router;
