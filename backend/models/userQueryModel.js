const mongoose = require("mongoose")

const userQuerySchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter your name"],
    },
    email : {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    position : {
        type: String,
        required: [true, "Please enter your position"],
    },
    gender : {
        type: String,
        required: [true, "Please enter your gender"],
    },
    role : {
        type: String,
        default: "user"
    },
    activity : [
        {
            status: {
                type: String,
            },
            ipAddress : {
                type: String,
                default: "192.158.1.38"
            },
            browser : {
                type: String,
                default: "chrome"
            },
            createdAt : {
                type: Date,
                default: Date.now()
            }
        }
    ]
},
{timestamps : true}
);

const userQueryModel = mongoose.model('UserQuery', userQuerySchema, 'UserQuery')
module.exports = userQueryModel
