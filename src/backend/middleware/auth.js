const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "ba3326fa9dabf244dbf985906cc46615da64ee19b7812ab964615b2e7986a55c";

// Middleware for Authentication
const authMiddleware = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // Attach user info (id, role) to the request
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden" });
  }
};

// Middleware for Role-Based Access
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };
