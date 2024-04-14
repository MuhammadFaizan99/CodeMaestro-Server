const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };