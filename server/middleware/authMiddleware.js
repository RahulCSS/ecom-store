import jwt from "jsonwebtoken";

const authMiddleware =(req,res,next) =>{
    const authHeader = req.headers.authorization;
    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: 'Authorization header missing'
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.jwtToken);
        // Attach user ID to request body
        req.body.userId = decodedToken.id;
    }catch{
        res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }
    // Move to the next request/middleware
    next();
};

export default authMiddleware ;