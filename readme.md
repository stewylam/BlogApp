# Prikkie
Prikkie allows you to write advertisement digitally. 
You can find different advertisement and comment to it.
From selling bicycles to babysitting services.
Start pin your advertisement(s) now!

![1](https://user-images.githubusercontent.com/25740926/27393569-f81d188e-56a9-11e7-881e-f2de88dabdbe.png)
![2](https://user-images.githubusercontent.com/25740926/27393570-f835447c-56a9-11e7-8750-f3ab295def8e.png)
![3](https://user-images.githubusercontent.com/25740926/27393572-f83a3dc4-56a9-11e7-84b6-62e2fe7d50f1.png)
![4](https://user-images.githubusercontent.com/25740926/27393574-f83de0a0-56a9-11e7-80a1-f862253a0f9c.png)
![5](https://user-images.githubusercontent.com/25740926/27393573-f83cc5f8-56a9-11e7-934b-0cfe3e0bbc4d.png)

Project Specification
Create a blogging application that allows users to do the following:
- register an account
- login
- logout

Once logged in, a user should be able to:
- create a post
- view a list of their own posts
- view a list of everyone's posts
- view a specific post, including the comments people have made about it
- leave a comment on a post

Prior to coding, determine the following:
- your tables: what columns will they have? How will they connect to one another?
- make a diagram showing the relationships between tables.
- your routes: what routes should you have? What should each route do?
Once you are done designing your application, then proceed with coding.
Submit this document in a text file as part of your application.

Other requirements:
Your routes must be "RESTful". See slide 4 of the http requests lecture: Link. Also look at the RESTful routing example in the node sample apps.
You must use Sequelize for this assignment. Your connection string must once again be read from the environment variables you set up for the Bulletin Board assignment.
Commit well - each commit should ideally be a new piece of functionality.

Hints:

sequelize.sync()
is a Promise that creates your tables if they do not already exist. Call this one time prior to starting up the server.

sequelize.sync({force: true})
is a Promise that deletes your tables first, then recreates them. Use this if you have changed the structure of your tables.

Later on, we'll learn about migrations, which will allow us to modify our tables without losing our data.
