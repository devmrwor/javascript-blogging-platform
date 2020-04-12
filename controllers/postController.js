const Post = require("../models/Post");

exports.viewCreateScreen = function (req, res) {
  res.render("create-post");
};

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then(function () {
      res.send("New post created.");
    })
    .catch(function (errors) {
      res.send(errors);
    });
};

exports.viewSingle = function (req, res) {
  res.render("single-post-screen");
};
