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

// the information gets read from the form. And creates a new username.
app.post('/', (req, res) => {
    const username = req.body.user
    const password = req.body.pass
    User.create({
        username: username,
        password: password
    })
    .then( () => {
        res.redirect('/')
    })
})

app.post('/blog', (req, res) => {


})


const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".


/*
app.post('/blog', (req, res) => {

    var user = request.session.user;
    if (user === undefined) {
        response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
    } else {
        response.render('profile', {
            user: user
        });
    }


    var username = req.body.user;
    var pass = req.body.pass;

// the application will connect to the sql database
    pg.connect(connectionString, function(err, client, done) {

     client.query('insert into users (username, pass) values (\'' + username + '\', \'' + pass +'\')', function(err) {
            if(err) {
            throw err;
        }
     }); // the database is connected. The values which are inserted in the form will be inserted to the SQL messages table.

        done();
        res.sendFile('blog.html'); // after submitting the page gets redirected to the bulletinboard
    });

});*/
/*    if (req.body.user ) {
        alert('logged in succesfully')
        res.sendFile('blog.html')
    } else {
        res.redirect('/')
        alert('username / password incorrect');
    }*/


/*app.post('/profile', (req, res) => {

    //check session

        //if not logged in
            res.end("not logged in")
        //if logged in

            res.render('profile', {specifdata for user:})

})
*/

/*app.post("showmymessages", (req, res) => {
    
    //check session
        //if not logged in
            res.end("nice try, not logged in")
        
        //if logged in
            query messages van user

            res.render(showmymessages, {messages: messages})

})
*/