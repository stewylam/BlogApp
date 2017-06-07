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

// defines the table, keys and datatypes.
//user model
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// message model
const Post = sequelize.define('post', {
  username: Sequelize.STRING,
  Message: Sequelize.TEXT
});

//comment model
const Comment = sequelize.define('comment', {
  username: Sequelize.STRING,
  Message: Sequelize.TEXT
});


      
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/sign', (req, res) => {
    res.render('sign', {user: req.session.user})
});

app.post('/sign', (req, res) => {

    var nUsername = req.body.nUser
    var nPassword = req.body.nPass

    User.create({
        username: nUsername,
        password: nPassword
    }).then(function() {
        res.redirect('/login');
    })
});


app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res) => {
    res.render('login')
});



const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".
