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

// defines the table, keys and datatypes.
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

//create tables -- if tables exists, then leave it
sequelize.sync()
      
app.get('/', (req, res) => {
    res.render('index')
});



const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".


