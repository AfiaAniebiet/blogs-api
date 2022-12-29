const Blog = require("../models/blogs");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Algorithm to calculate for reading_time
const calculateReadingTime = (text) => {
  let readTime;
  try {
    const wpm = 275;
    const words = text.split(" ");
    const textWordAmount = words.length;
    readTime = Math.ceil(textWordAmount / wpm);
  } catch (error) {
    return null;
  }
  return `${readTime} minute(s) read`;
};

// All users can access posted blogs
const getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find({});
  res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
};

// Retrieve a Single Blog from the database
const getSingleBlog = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;

  const blog = await Blog.findOne({
    _id: blogId,
    author: userId,
  });

  if (!blog) {
    throw new NotFoundError("Blog does not exist");
  }
  res.status(StatusCodes.OK).json({ blog });
};

// Registered & Logged in users retrieves all their posted blogs
const getBlogsByRegisteredUser = async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user.userId }).sort("state");
  res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
};

const getCreateNewBlog = async (req, res, next) => {
  res.send("Get Create Blog");
};

// Create and Post New Blog
const postNewBlog = async (req, res, next) => {
  req.body.author = req.user.userId;
  req.body.reading_time = calculateReadingTime(req.body.blogBody);
  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ blog });
};

// Update Blog Functionality
const updateBlog = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;
  req.body.reading_time = calculateReadingTime(req.body.blogBody);

  const blog = await Blog.findByIdAndUpdate(
    { _id: blogId, author: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!blog) {
    throw new NotFoundError("Blog does not exist");
  }

  res.status(StatusCodes.OK).json({ blog });
};

// Delete Blog Functionality
const deleteBlog = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;

  const blog = await Blog.findByIdAndRemove({
    _id: blogId,
    author: userId,
  });

  res.status(StatusCodes.OK).json({ blog });
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  getBlogsByRegisteredUser,
  getCreateNewBlog,
  postNewBlog,
  updateBlog,
  deleteBlog,
};
