const postsCollection = require("../db").db().collection("posts");
const ObjectID = require("mongodb").ObjectID;
const sanitizeHTML = require("sanitize-html");
const User = require("./User");

let Post = function (data, userid, requestedPostId) {
  this.data = data;
  this.userid = userid;
  this.errors = [];
  this.requestedPostId = requestedPostId;
};

Post.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }
  // Get rid of any bogus properties
  this.data = {
    title: sanitizeHTML(this.data.title.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    body: sanitizeHTML(this.data.body.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    createdDate: new Date(),
    author: ObjectID(this.userid),
  };
};

Post.prototype.validate = function () {
  if (this.data.title == "") {
    this.errors.push("You must provide a title.");
  }
  if (this.data.body == "") {
    this.errors.push("You must provide post centent.");
  }
};

Post.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      // Save post into database
      postsCollection
        .insertOne(this.data)
        .then((info) => {
          resolve(info.ops[0]._id);
        })
        .catch(() => {
          this.errors.push("Please try again later.");
          reject(this.errors);
        });
    } else {
      reject(this.errors);
    }
  });
};

Post.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.findSingleById(this.requestedPostId, this.userid);
      if (post.isVisitorOwner) {
        let status = await this.actuallyUdpate();
        resolve(status);
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Post.prototype.actuallyUdpate = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    this.validate();
    if (!this.errors.length) {
      await postsCollection.findOneAndUpdate(
        { _id: new ObjectID(this.requestedPostId) },
        { $set: { title: this.data.title, body: this.data.body } }
      );
      resolve("success");
    } else {
      resolve("failure");
    }
  });
};

Post.reusablePostQuery = function (uniqueOperations, visitorId) {
  return new Promise(async (resolve, reject) => {
    let aggOperations = uniqueOperations.concat([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDocument",
        },
      },
      {
        $project: {
          title: 1,
          body: 1,
          createdDate: 1,
          authorId: "$author",
          author: { $arrayElemAt: ["$authorDocument", 0] },
        },
      },
    ]);
    let posts = await postsCollection.aggregate(aggOperations).toArray();
    // clean up author property in each post object
    posts = posts.map(function (post) {
      post.isVisitorOwner = post.authorId.equals(visitorId);
      post.authorId = undefined;
      post.author = {
        username: post.author.username,
        avatar: new User(post.author, true).avatar,
      };
      return post;
    });
    resolve(posts);
  });
};

Post.findSingleById = function (id, visitorId) {
  return new Promise(async (resolve, reject) => {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      reject();
      return;
    }

    let posts = await Post.reusablePostQuery(
      [{ $match: { _id: new ObjectID(id) } }],
      visitorId
    );

    if (posts.length) {
      // console.log(posts[0]);
      resolve(posts[0]);
    } else {
      reject();
    }
  });
};

Post.findByAuthorId = function (authorId) {
  return Post.reusablePostQuery([
    { $match: { author: authorId } },
    { $sort: { createdDate: -1 } },
  ]);
};

Post.delete = function (postIdToDelete, currentUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await Post.findSingleById(postIdToDelete, currentUserId);
      if (post.isVisitorOwner) {
        await postsCollection.deleteOne({ _id: new ObjectID(postIdToDelete) });
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};

Post.search = function (searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof searchTerm == "string") {
      let posts = await Post.reusablePostQuery([
        { $match: { $text: { $search: searchTerm } } },
        { $sort: { score: { $meta: "textScore" } } },
      ]);
      resolve(posts);
    } else {
      reject();
    }
  });
};

Post.countPostsByAuthor = function (id) {
  return new Promise(async (resolve, reject) => {
    let postCount = await postsCollection.countDocuments({ author: id });
    resolve(postCount);
  });
};

module.exports = Post;
