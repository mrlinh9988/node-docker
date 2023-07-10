const Post = require("../models/postModels");

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    console.log(req.body);
    res.json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
    });
  }
};

exports.deletePost = async (req, res, next) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
      });
    }
  };
