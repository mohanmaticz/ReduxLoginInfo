const express = require("express");
const router = express.Router();

//Importing the JWT Authentication Middleware
const {authVerify} = require("../helper/authVerify")

//Importing the api controller
const {
        registerUser, 
        loginUser,
        changePassword,
        getUserInfo,
        limitGetInfo,
        updateUser
    } = require("../controllers/userController");
const decryptData = require("../helper/decryptData");

router.post("/register", decryptData, registerUser)
router.post("/login", decryptData, loginUser)
router.put("/change-password", authVerify, changePassword)
router.get("/info", authVerify, getUserInfo)
router.post("/update/:id", updateUser)
router.get("/limit/info", authVerify, limitGetInfo)


module.exports = router;