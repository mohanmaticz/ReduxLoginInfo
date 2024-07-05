const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter your name"],
    },
    email : {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        ref: 'Activity'
    },
    phone : {
        type: Number,
        required: [true, "Please enter your phone numbar"],
    },
    position : {
        type: String,
        required: [true, "Please enter your position"],
    },
    gender : {
        type: String,
        required: [true, "Please enter your gender"],
    },
    password : {
        type: String,
        required: [true, "Please enter your password"]
    },
    role : {
        type: String,
        default: "user"
    },
    ipAddress : {
        type: String,
        default: "192.158.1.38"
    },
    browser : {
        type: String,
        default: "chrome"
    },
    avatar : {
        type: String,
    },
    logs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    hitCount: {
        type: Number,
        default: 0
    },
    lastHitDate: {
        type: Date,
        default: new Date()
    }
},
{timestamps : true}
);

const userModel = mongoose.model('User', userSchema, 'User')
module.exports = userModel
