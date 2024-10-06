import jwt from "jsonwebtoken";

const authMiddleware = {
  authentication: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).send("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send("Unauthorized: Token missing");
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
      console.log("Decoded Token:", decodedToken);
      req.user = { userId: decodedToken.userId }; 

      next(); 
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).send("Unauthorized: Invalid token");
    }
  },
};

export default authMiddleware;
