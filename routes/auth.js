// Create express router
const express = require("express");
const router = express.Router();
//const userController = require("../controllers/user");

const {
  createNewUser,
  loginUser,
  getSignUpForm,
} = require("../controllers/auth");

router.route("/sign-up").get(getSignUpForm).post(createNewUser);
router.route("/login").post(loginUser);

// router.get("/sign-up", userController.getSignUpForm);
// router.post("/sign-up", userController.createNewUser);
// router.post("/login", userController.loginUser);

module.exports = router;
