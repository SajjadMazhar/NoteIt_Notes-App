const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    const auth = req.headers.authorization
    if(!auth){
        return res.status(403).json({title:"error", msg:"token expired"})
    }
    const token = auth.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.id = decoded.id
        next()
    } catch (error) {
        res.status(500).json({title:"error", msg:"invalid token"})
    }
}
module.exports = verifyToken