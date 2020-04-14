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

- to be done.

## Live Validation

- to be done.

## Security

- to be done.

## API

- to be done.

Based on [Learn JavaScript: Full-Stack from Scratch](https://www.udemy.com/course/learn-javascript-full-stack-from-scratch/) by Brad Schiff (2019).
