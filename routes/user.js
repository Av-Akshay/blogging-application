const { Router } = require("express");
const router = Router();
const {
  handelRenderSignINPage,
  handelRenderSignUpPage,
  handelSignUpUser,
  handelSignInUser,
  handelLogoutUser
} = require("../controllers/user");

router.route("/signin").get(handelRenderSignINPage).post(handelSignInUser);
router.route("/signup").get(handelRenderSignUpPage).post(handelSignUpUser);
router.route("/logout").get(  handelLogoutUser
)

module.exports = router;
