const { validateToken } = require("../services/authentication");

function checkAuthenticateUser(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) return next();
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log(`error in checkAuthenticateUser=> ${error}`);
    }
    return next();
  };
}
module.exports = {
  checkAuthenticateUser,
};
