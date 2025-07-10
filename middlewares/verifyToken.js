const jwt = require("jsonwebtoken");
require('dotenv').config(); // Make sure this is included

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }
    const bearer = token.split(" ");
    const jwtToken = bearer.length === 2 ? bearer[1] : bearer[0];
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
