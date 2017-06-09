const fs = require('fs')
const express = require('express')
const pug = require('pug')
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
  first: Sequelize.STRING,
  last: Sequelize.STRING,
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// message model
const Post = sequelize.define('post', {
  title: Sequelize.TEXT,
  body: Sequelize.TEXT
});

//comment model
const Comment = sequelize.define('comment', {
  comment: Sequelize.TEXT
});

///// define different relations
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);


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
    var first = req.body.first
    var last = req.body.last
    var email = req.body.email
    var nUsername = req.body.nUser
    var nPassword = req.body.nPass

    User.findOne({
        where: {
            username: nUsername
        }
    }).then( user => {
        if(user){
            res.render('index', {user: user, message: 'Aah, look like you missed the boat, another user already picked out this cool username. Try another one!'});
        } else {
            User.create({
                first: first,
                last: last,
                email: email,
                username: nUsername,
                password: nPassword
            }).then(function() {
            res.render('login', {user: user, message: 'Congrats, you are Succesfully registered as a bloggie. Login to start blogging!'});
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
            res.redirect('/profile')
        } else {
            res.render('login', {message: 'Oopsie, Invalid username/password. Try Again!'});
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
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {
    Post.findAll({
        include: [{
        model: User, Comment
        }]
    })
/*    .then(user) => {
        User.findOne({
            username: user 
        })
    }*/
    .then((posts)=> {
        res.render('profile', {posts: posts})
    });
    }

});

app.post('/profile', (req, res) => {
    var user = req.session.user;
    var title = req.body.title
    var body = req.body.body

    if (user === undefined) {
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {
    Post.create({
        title: title,
        body: body, 
        userId: user.id
    }).then(posts => {
        res.redirect('/myblog');
    });
    }

})


///// My Blog
app.get('/myblog', (req, res) => {
    var user = req.session.user;

    if (user === undefined) {
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {
    Post.findAll({
        include: [{
        model: User, Comment
        }]
    })
/*    .then(user) => {
        User.findOne({
            username: user 
        })
    }*/
    .then(posts => {
        res.render('myblog', {posts: posts})
    });
    }


})


////// all posts
app.get('/blog', (req, res) => {
    var user = req.session.user;

    if (user === undefined) {
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {
    Post.findAll({
            include: [ {
                model: User
            }]
        })
        .then((posts)=> {
        res.render('blog', {posts: posts, user: user})
        console.log(posts);
        });
    }
})

app.post('/blog', (req, res) => {
    var user = req.session.user;
    var title = req.body.title
    var post = req.body.body

    if (user === undefined) {
            res.render('login', {user: user, message: 'Please log in to view bloggie.'});
        } else {
            res.redirect('/blog');
        }

});

//// Specific Blog
app.get('/page', (req, res) => {
    var user = req.session.user;

/*    if (user === undefined) {
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {

        Post.findAll({
            where: {
                userId = user clicked on title
            }
        }).then(){*/
            res.render('page')
/*        }
    }*/
});

/*app.post('/page', (req, res) => {
    var post = req.body.body
    var comment = req.body.comment
  
    if (user === undefined) {
        res.render('login', {user: user, message: 'Please log in to view bloggie.'});
    } else {
        Comment.create({
            comment = comment
        }).then(function() {
            res.redirect('/page');
          })
      }
})

*/

const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".
