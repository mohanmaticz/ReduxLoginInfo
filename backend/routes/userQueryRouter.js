const express = require("express");
const router = express.Router();

//Importing the api controller
const {
        registerUser,
        getUsers,
        getUser,
        getUsersActivity,
        getUserActivity
    } = require("../controllers/userQueryController");

router.post("/register", registerUser)
router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.get("/users/activity", getUsersActivity)
router.get("/user/activity/:id", getUserActivity)

module.exports = router