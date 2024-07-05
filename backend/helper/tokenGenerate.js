const jwt = require("jsonwebtoken");
const path = require("path");
require('dotenv').config({path: path.join(__dirname, "..", 'env', '.env')})

const tokenGenerator = (user) => {
    const token = jwt.sign({user}, process.env.JWT_KEY, {expiresIn: "12h"})
    return token
}

module.exports = tokenGenerator