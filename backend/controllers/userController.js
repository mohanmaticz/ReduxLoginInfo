const User = require('../models/userModel')
const logActivity = require('../helper/logActivity')
const tokenGenerator = require("../helper/tokenGenerate")
const mailer = require('../helper/mailHelper')
const bcrypt = require('bcrypt');
const cronJob = require('../helper/cronJob')
const path = require("path")
require('dotenv').config({path: path.join(__dirname, '..', 'env', '.env')})
const CryptoJS = require("crypto-js")

//POST - /user/register (To add a new user data)
exports.registerUser = async (req, res) => {
    try {
        const {name, email, phone, position, gender, password} = req.decryptedData

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const user = {
            name,
            email,
            phone,
            position,
            gender,
            password : hashPassword,
        }
        const newUser = await User.create(user) 
        // const token = await tokenGenerator(newUser)
        const activity = await logActivity(newUser.email, newUser._id, "registered")
        await newUser.logs.push(activity._id)
        await newUser.save()

        // const createdSec = new Date(newUser.createdAt)
        // const d = new Date()
        // console.log("cron init", d.toLocaleString());
        // cronJob(newUser)

        // createdSec.getSeconds(), 

        // const mailInfo = await mailer(email, name, "Register", "Successfully You Have Registered")
        // console.log("Register Message sent: ", mailInfo);

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(newUser), 'crypto-secret-key').toString();

        res.status(200).json({
            success: true,
            user: encryptedData,
            // activity,
            message: "Successfully user created",
            // token
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

//POST - /user/login (User Login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.decryptedData;
        const user = await User.findOne({email})

        if (!user) {
            return res.status(200).json({
                success: false,
                error: "User not found. Register first"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(200).json({
                success: false,
                error: "Password in incorrect"
            })
        }

        const token = await tokenGenerator(user)
        const activity = await logActivity(user.email, user._id, "logged in")
        await user.logs.push(activity._id)
        await user.save()
        
        // const mailInfo = await mailer(user.email, user.name, "Logged In", "Successfully You Have Logged In")
        // console.log("Login Message sent: ", mailInfo);


        const {password: pass, ...other} = user._doc
        res.status(200).json({
            success: true,
            // user: other,
            message: "Login successfull",
            // activity,
            token
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

//PUT - user/change-password (To change user password)
exports.changePassword = async (req, res) => {
    try {
        const {_id} = req.user
        const user = await User.findById(_id)
        // console.log(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found. Register first"
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.oldPassword, user.password)

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: "Password is incorrect"
            })
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds)

        const updatePassword = await User.findByIdAndUpdate(_id, {password: hashPassword}, {new: true})
        const activity = await logActivity(user.email, user._id, "changed password")
        await user.logs.push(activity._id)
        await user.save()
        // const mailInfo = await mailer(user.email, user.name, "changed password", "Successfully Password Changed")
        // console.log("Change Password Message sent: ", mailInfo);

        const {password, ...other} = user._doc
        res.status(200).json({
            success: true,
            user: other,
            message: "Password changed successfully",
            activity
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const {_id} = req.user
        const user = await User.findById(_id)
        let info;

        if (!user || user.length === 0) {
            return res.status(200).json({
                success: false,
                error: "No user not found. Register first"
            })
        }

        if (user.role === "admin") {
            const users = await User.find({})
            const encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(users), process.env.CRYPTO_KEY).toString();
            info = encryptedInfo;
        } else {
            const encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.CRYPTO_KEY).toString();
            info = encryptedInfo;
        }
        
        res.status(200).json({
            success: true,
            info,
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.limitGetInfo = async (req, res) => {
    try {
        const {_id} = req.user
        const user = await User.findById(_id)

        const now = new Date()
        if (now > user.lastHitDate) {
            const count = user.hitCount + 1
            user["hitCount"] = count
            await user.save()

            if (user.hitCount <= 5) {
                // console.log("update",user.updatedAt.toLocaleString());
                return res.status(200).json({
                        success: true,
                        info: user,
                    })
            }

            const currentDate = new Date()
            const addedMin = currentDate.setMinutes(currentDate.getMinutes() + 5)

            user["hitCount"] = 0
            user["lastHitDate"] = addedMin 
            await user.save()

            res.status(200).json({
                success: false,
                message: "Maximum limit reached. Try after 5 minutes"
            })
        } else {
            res.status(200).json({
                success: false,
                message: "Maximum limit reached. Try after some minutes"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params
        let userData = req.body;
        // console.log(userData, "update user");
        console.log(req.files);

        if (req.files && req.files.avatar) {
            const avatarFile = req.files.avatar;
            const uploadPath = path.join(__dirname, '..', 'images', avatarFile.name);
            // console.log(uploadPath);
            avatarFile.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        error: "image error"
                    });
                }
            });

            userData.avatar = `${avatarFile.name}`;
        }

        userData.logs = userData.logs.split(",")
        console.log(userData, "update user");

        const user = await User.findByIdAndUpdate({_id: id}, {...userData})
        // const user = await User.findById(id)
        if (!user) {
            return res.status(200).json({
                success: false,
                error: "User not found. Register first"
            })
        }

        res.status(200).json({
            success: true,
            message: "Updated successfully",
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.uploadPic = (req, res, next) => {
    try {
        const file = req.files
        console.log("file", file);
        // const uploadPath = path.join(__dirname, "uploads", file.name)
        // file.mv(uploadPath, (err) => {
        //     if (err) {
        //         return res.status(500).json(err)
        //     }            
        // })

        next()
        
    } catch(err) {
        console.log(err)
        res.send(err)
    }
}