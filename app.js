const fs = require('fs')
const express = require('express')
const pg = require ('pg')

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
// connection string. Anyone can use this app, no need for username and password.

const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
}); // application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".


app.get("/" (req, res) => {

    res.sendFile('index.html')
})

/*
app.post("/profile" (req, res) => {

    //check session

        //if not logged in
            res.end("not logged in")
        //if logged in

            res.render(profile page {specifdata for user:})

})

app.post("showmymessages", (req, res) => {
    
    //check session
        //if not logged in
            res.end("nice try, not logged in")
        
        //if logged in
            query messages van user

            res.render(showmymessages, {messages: messages})

})
*/