const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

exports.authVerify = async (req, res, next) => {
    let authHeader = req.headers["authorization"]

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token not found. Access denied"
        })
    }
    
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: err
            })
        } else {
            req.user = decoded.user 
            // console.log("decoded",decoded);
            next()
        }
    })
}

exports.checkAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        return res.status(404).json({
            message: "Login first"
        })
    }

    if (user.role !== 'admin') {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }
    next()
}
