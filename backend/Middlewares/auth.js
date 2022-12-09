const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

//function to ensure that only authenticated user can access a private route

const secure = async (req, res, next) => {
  let token;
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer")) {
    try {
      //get the token from the header
      token = authToken.split(" ")[1];

      //now verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "Not Authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorized, token not present" });
  }
};

module.exports = secure;
