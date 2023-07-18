const Post = require('../models/post');

exports.createPost = (post) => {
  return Post.create(post);
};

exports.getAllPosts = () => {
  return Post.find();
};

exports.findById = (postId) => {
  return Post.findById(postId);
};

exports.deletePost = (postId) => {
  return Post.findByIdAndDelete(postId);
};
exports.updatePost = (postId, updatedFields) => {
  return Post.findByIdAndUpdate(postId, updatedFields, { new: true });
};
