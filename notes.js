    if (req.body.username.length === 0){
        res.redirect('/login/?message=' + encodeURIComponent("Please fill out your username."))
    }
    if (req.body.password.length === 0){
        res.redirect('/login/?message=' + encodeURIComponent("Please fill out your password."))
    }

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user){
        if(result === true) {
            req.session.user = user;
            res.redirect('/profile/'+user.username)
        } else {
            res.redirect('/login/?message=' + encodeURIComponent("Invalid username or password."))
            }
        })
});



app.post('/login', function(request, response) {
    User.findOne({
        where: {
            name: request.body.username
        }
    }).then(function(user) {
        if(user != null){
                bcrypt.compare(user.password, request.body.userpass, function(err, res) {
                    request.session.lastPage = 'login';
                    request.session.userid = user.id;
                    request.session.username = user.name;
                    console.log('Succesfully logged in as: ' + user.name);
                    response.redirect('/')
                })
            } else{
                response.send('Unknown username or invalid password!')
            }
    })
})







app.post('/', (req, res) => {
    var nUsername = req.body.nUser
    var nPassword = req.body.nPass
    
    User.findOne({
        where: {username: nUsername
        }
    })

    .then(res => {
        if(nUsername === username[i] ) {
            res.redirect('/')
            res.send('Username already exists')
        } else {
            User.create({
                username: nUsername,
                password: nPassword
            })
        res.send('Created new user succesfully')
        res.redirect('/login')
        }
    
    })

/*app.post('/signup', (req, res) => {
    var nUsername = req.body.nUser
    var nPassword = req.body.nPass
    
    User.findOne({
        where: {username: nUsername
        }
    })

    .then(res => {
        if(nUser === undefined ) {
            res.redirect('/')
            res.send('Username already exists')
        } else {
            User.create({
                username: username,
                password: password
        })
        };
    res.send('Created new user succesfully')
    });

    .then(result) {

    }


*/

// the information gets read from the form. And creates a new username.
/*app.post('/signup', (req, res) => {
    var username = req.body.user
    var password = req.body.pass
    
    User.findOne(username)
    .then(result => {
        //bestaat ie??

        if(bestaat) {
            redirect
        }
        else {
            User.create....
        }
    })
    .then(result) 

    User.create({
        username: username,
        password: password
    })
    /*.then( (req, res) => {
    if (username === 'username' && password === 'password') {
    req.session.authenticated = true;
    res.redirect('/blog');
    } else {
        alert('error', 'Username and password are incorrect');
        res.redirect('/');
        }
    })
*/

/*})


app.post('/', function (req, res) {

});

app.get('/blog', (req, res) => {
  res.render('blog');
})

app.get('/all', (req, res) => {
  res.render('all');
})


app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/');
});  


/*
app.post('/login', function(req, res) {
    authenticate(req.body.user, req.body.pass, function(err, user){
        if(user){
            req.session.regenerate(function(){
                req.session.user = user;
                req.session.success = 'authenticated as' + user + ' click to <a href='/logout'>logout</a>. ' + ' You mag now access <a href='/restricted'>/restricted</a>.';
                res.redirect('back');
            });
        } else {
            req.session.error = 'authentication failed, please check your' + 'username and password.';
            res.redirect('/')
        }
    });

});
*/


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