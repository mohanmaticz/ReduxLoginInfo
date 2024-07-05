const Activity = require('../models/activityModel')

const logActivity = async(email, id, status) => {
    const activity = await Activity.create({user: email, userId: id, status})
    return activity
}

module.exports = logActivity