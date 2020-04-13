const Post = require("../models/Post");

exports.viewCreateScreen = function (req, res) {
  res.render("create-post");
};

exports.create = function (req, res) {
  let post = new Post(req.body, req.session.user._id);
  post
    .create()
    .then(function (newId) {
      req.flash("success", "New post successfully created.");
      req.session.save(function () {
        res.redirect(`/post/${newId}`);
      });
    })
    .catch(function (errors) {
      errors.forEach((error) => req.flash("errors", error));
      req.session.save(function () {
        res.redirect("/");
      });
    });
};

exports.viewSingle = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id, req.visitorId);
    res.render("single-post-screen", { post: post });
  } catch {
    res.render("404");
  }
};

exports.viewEditScreen = async function (req, res) {
  try {
    let post = await Post.findSingleById(req.params.id);
    if (post.authorId == req.visitorId) {
      res.render("edit-post", { post: post });
    } else {
      req.flash("errors", "You do not have permission to perform that action.");
      req.session.save(function () {
        res.redirect("/");
      });
    }
  } catch {
    res.render("404");
  }
};

exports.edit = function (req, res) {
  let post = new Post(req.body, req.visitorId, req.params.id);
  post
    .update()
    .then((status) => {
      if (status == "success") {
        // post was updated in db
        req.flash("success", "Post successfully updated.");
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      } else {
        // display validation errors
        post.errors.forEach(function (error) {
          req.flash("errors", error);
        });
        req.session.save(function () {
          res.redirect(`/post/${req.params.id}/edit`);
        });
      }
    })
    .catch(() => {
      // requested id doesn't exist
      // current visitor is not the author of the requested post
      req.flash("errors", "You do not have permission to perform that action.");
      req.session.save(function () {
        res.redirect("/");
      });
    });
};
