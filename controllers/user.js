const User = require("../models/user")

const handelRenderSignINPage = (req, res) => {
  res.render("signin");
};

const handelRenderSignUpPage = (req, res) => {
  res.render("signup");
};

const handelSignInUser = async (req, res)=>{
    const {email,password} = req.body;
    try {
      const token= await User.matchPasswordAndGenerateToken(email,password)
      res.cookie("token",token).redirect("/")
      
    } catch (error) {
      console.log(`error in signin user ${error} `);
      res.render("signin",{
        error : "incorrect email or password"
      })
    }
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
const handelLogoutUser= (req,res)=>{
  console.log("envok");
  res.clearCookie("token").redirect("/")
}
module.exports = {
  handelRenderSignINPage,
  handelRenderSignUpPage,
  handelSignUpUser,
  handelSignInUser,
  handelLogoutUser
};
