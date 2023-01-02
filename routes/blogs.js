// Initializing express and creating router
const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authentication");
const blogsController = require("../controllers/blogs");

router.get("/", blogsController.getAllBlogs);
router.post("/", authUser, blogsController.postNewBlog);
router.get("/user-blogs", authUser, blogsController.getBlogsByRegisteredUser);
router.get("/create-blog", authUser, blogsController.getCreateNewBlog);
router.get("/blog/:id", blogsController.getSingleBlog);
router.patch("/blog/:id", authUser, blogsController.updateBlog);
router.delete("/blog/:id", authUser, blogsController.deleteBlog);

// const {
//   getAllBlogs,
//   getCreateNewBlog,
//   getBlogsByRegisteredUser,
//   getSingleBlog,
//   postNewBlog,
//   updateBlog,
//   deleteBlog,
// } = require("../controllers/blogs");

// router.route("/").get(getAllBlogs).post(postNewBlog);
// router.route("/user-blogs").get(getBlogsByRegisteredUser);
// router.route("/create-blog").get(getCreateNewBlog);
// router
//   .route("/blog/:id")
//   .get(getSingleBlog)
//   .patch(updateBlog)
//   .delete(deleteBlog);

module.exports = router;
