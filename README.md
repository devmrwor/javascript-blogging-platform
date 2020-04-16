# Blogging Platform

A blogging platform using MongoDB Atlas, Express and Node.

## Core features

- using Model–View–Controller (MVC) design pattern.
- handling routes with Express.
- handling views with Embedded JavaScript templates (EJS).
- validating user data with validator.
- adding registered users to MongoDB Atlas and hashing passwords with bcryptjs.
- using promises and async/await method.
- managing connected users with express-session.
- storing sessions with connect-mongo.
- displaying error/success messages with connect-flash.
- displaying profile picture with Gravatar and generating image urls with md5.
- performing CRUD operations (create, read, update, delete) using MongoDB Atlas for posts.
- displaying profile with the latest posts published by author.
- handling markdown in posts with marked.
- sanitizing data posted by users with sanitize-html.
- preventing Cross-Site Request Forgery (CSRF) with csurf.

## Live Search Feature

- bundling front-end JavaScript with Webpack and Babel.
- handling key press events with setTimeout().
- sending search requests to the server with Axios.
- creating an index in MongoDB Atlas and building a search request to the database.
- sanitizing results with DOMPurify.

## Follow Feature

- handling follow and unfollow features on author profile.
- storing followed users in the database.
- retrieving followers and followed users from the database.
- counting posts, followers and followed users with await Promise.all() and countDocuments().
- displaying a feed on the dashboard with the latest posts published by followed users.

## Live Chat

- handling realtime communication between web clients and server with Socket.IO.
- sending messages with emit() and waiting for messages with on().
- broadcasting messages with socket.broadcast.emit().
- displaying usernames and avatars in the live chat with express-session.
- sanitizing messages with sanitize-html (server-side) and DOMPurify (client-side).

## Live Validation

- displaying errors on the fly for registration form with regex.
- checking if username and email are already in the database with Axios.
- performing a last check before submitting the form.

## API

- granting access to the API with JSON Web Tokens (/api/login).
- enabling routes for creating (/api/create-post) and deleting posts (/api/post/:id) through the API.
- enabling public GET requests to retrieve posts by author (/api/posts-by-author/:username).
- handling Cross-origin resource sharing (CORS).

## Heroku

- deploying on Heroku.

Based on [Learn JavaScript: Full-Stack from Scratch](https://www.udemy.com/course/learn-javascript-full-stack-from-scratch/) by Brad Schiff (2019).
