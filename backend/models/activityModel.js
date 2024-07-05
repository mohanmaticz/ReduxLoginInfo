const mongoose = require("mongoose")

const activitySchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user : {
        type: String,
    },
    status : {
        type: String,
        required: true,
    },
    ipAddress : {
        type: String,
        default: "192.158.1.38"
    },
    browser : {
        type: String,
        default: "chrome"
    }
},
{timestamps: true}
)

const activityModel = mongoose.model('Activity', activitySchema, 'Activity')
module.exports = activityModel
