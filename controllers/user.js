const User = require("../models/user")

const handelRenderSignINPage = (req, res) => {
  res.render("signin");
};

const handelRenderSignUpPage = (req, res) => {
  res.render("signup");
};

const handelSignInUser = async (req, res)=>{
    const {email,password} = req.body;
  const user=  User.matchPassword(email,password)
  console.log(`user=> ${User}`);
  res.redirect("/")
}

const handelSignUpUser = async (req, res) => {
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    res.redirect("/")
};
module.exports = {
  handelRenderSignINPage,
  handelRenderSignUpPage,
  handelSignUpUser,
  handelSignInUser
};
