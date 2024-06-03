import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader,"authhhhhhhhhh")
    if (authHeader == null || authHeader == undefined) {
        return res.status(401).json({ status: false, message: "You are Unauthorized" })

    }
    const token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET,(err,payload) => {
      if (err) {
        console.log(err,"error from middleware")
        return res.status(401).json({ status: false, message: "You are Unauthorized" })
      } 
      req.user = payload
      next() 
    })
}

export default authMiddleware;