const fs = require('fs')
const express = require('express')
const pug = require('pug')
const pg = require ('pg')
const bodyParser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogapp');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms
app.use(express.static('public'));
app.use(session({
    secret: 'security',
    resave: true,
    saveUninitialized: false
}));

//create tables -- if tables exists, then leave it
sequelize.sync()


////// defines the table, keys and datatypes.

//user model
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// message model
const Message = sequelize.define('post', {
  username: Sequelize.STRING,
  message: Sequelize.TEXT
});

//comment model
const Comment = sequelize.define('comment', {
  username: Sequelize.STRING,
  comment: Sequelize.TEXT
});

////// different routes

app.get('/', (req, res) => {
    res.render('index')
});


///// user management

app.get('/', (req, res) => {
    res.render('/', {user: req.session.user})
});

//// register new user
app.post('/', (req, res) => {

    var nUsername = req.body.nUser
    var nPassword = req.body.nPass

    User.findOne({
        where: {
            username: nUsername
        }
    }).then( user => {
        console.log(user)
        if(user){
            res.render('index', {message: 'Aah, look like you missed the boat, another user already picked out this cool username. Try another one!'});
        } else {
            User.create({
                username: nUsername,
                password: nPassword
            }).then(function() {
            res.render('login', {message: 'Congrats, you are Succesfully registered as a bloggie. Login to start blogging!'});
            })
        }
    });

    
});


app.get('/login', (req, res) => {
    res.render('login', {
        user: req.session.user
    })
});

//// login 
app.post('/login', (req, res) => {
    var username = req.body.user
    var password = req.body.pass

    if(username.length === 0 || password.length === 0) {
        res.render('login', {message: 'Please fill out your username/password.'});
        return;
    }

    User.findOne({
        where: {
            username: username
        }
    })

    .then(function(user){
        if(username !== null && password === user.password) {
            req.session.user = user;
            res.render('profile', {username: username})
            console.log('logged in succesfully')
        } else {
            res.render('login', {message: 'Oopsie Invalid username/password'});
        }
    });
});

//// logout
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if(err) {
            throw err;
        }
        res.render('login', {message: 'Successfully logged out.'});
    });
});  


//// profile page
app.get('/profile', (req, res) => {
    var user = req.session.user;
    
    if (user === undefined) {
        res.redirect('/', {message: 'Please log in or register to view your profile.'});
    } else {
        res.render('profile', {
            user: user, username: username
        });
    }
});

app.post('/profile', (req, res) => {
    var username = req.body.name
    var message= req.body.mess

    Message.create({
        username: username,
        message: message
    }).then(function() {
            console.log('message posted')
            res.render('profile', {message: 'Message Posted Succesfully', username: username});
    })
});

////// all posts
app.get('/blog', (req, res) => {
    var user = req.session.user;

    if (user === undefined) {
        res.redirect('/login', {message: 'Please log in to view bloggie.'});
    } else {
    res.render('blog');
    }
})

const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".
