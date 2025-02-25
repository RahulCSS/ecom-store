import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'Authorization header is missing' });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decodedToken = jwt.verify(token, process.env.jwtToken);
      req.body.userId = decodedToken.id;
      next(); 
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid token or expired token' });
    }
  };
  

export default authMiddleware ;