const User = require('../models/userModel')


const mongoose = require("mongoose")


exports.getActivities = async (req, res) => {
    try {
        const activityLogs = await User.find()
                                           .populate("logs")
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,Status:false
        })
    }
}

exports.getActivitiesAgg = async (req, res) => {
    try {
        const activityLogs = await User.aggregate([{
            $lookup: {
                from: "Activity",
                localField: "logs",
                foreignField: "_id",
                as: "user_activity"
            }
        }])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getActivity = async (req, res) => {
    try {
        const activityLogs = await User.find({_id: req.params.id})
                                           .populate("logs")
                                        //    .exec()
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }
        
        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,Status:false
        })
    }
}

exports.getActivityAgg = async (req, res) => {
    try {
        // console.log("req.params.id",req.params.id,new mongoose.Types.ObjectId(req.params.id));
        const activityLogs = await User.aggregate([
            {$match: {_id:new mongoose.Types.ObjectId(req.params.id)}},
            {   $lookup: {
                from: "Activity",
                localField: "logs",
                foreignField: "_id",
                as: "user_activity"
            }}
        ])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

exports.getTodayActivitiesPop = async (req, res) => {
    try {
        const date = new Date()
        const today = new Date()    
        const yesterday = new Date(new Date(date.setDate(date.getDate() - 1)).setHours(23, 59, 59))
        
        const activityLogs = await User.find()
                                           .populate({
                                            path: "logs",
                                            match: {
                                                "createdAt": {$gt: yesterday, $lt: today},
                                            }
                                        })
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error,Status:false
        })
    }
}

exports.getTodayActivityPop = async (req, res) => {
    try {
        const date = new Date()
        const today = new Date()    
        const yesterday = new Date(new Date(date.setDate(date.getDate() - 1)).setHours(23, 59, 59))
        
        const activityLogs = await User.find({_id: req.params.id})
                                           .populate({
                                            path: "logs",
                                            match: {
                                                "createdAt": {$gt: yesterday, $lt: today},
                                            }
                                        })
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            status:false,
            message: error.message
        })
    }
}

exports.getTodayActivitiesAgg = async (req, res) => {
    try {
        const date = new Date()
        const today = new Date()    
        const yesterday = new Date(new Date(date.setDate(date.getDate() - 1)).setHours(23, 59, 59))

        const activityLogs = await User.aggregate([
            {
                $lookup: {
                    from: "Activity",
                    localField: "email",
                    foreignField: "user",
                    pipeline: [
                        {
                            $match: {
                                createdAt: {$gt: yesterday, $lt: today},
                            }
                        }
                    ],
                    as: "user_activity"
                }
            }
        ])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }
        
        res.status(200).json({
            success: true,
            activityLogs,
            date
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
}

exports.getTodayActivityAgg = async (req, res) => {
    try {
        const date = new Date()
        const today = new Date()
        const yesterday = new Date(new Date(date.setDate(date.getDate() - 1)).setHours(23, 59, 59))
        
        const activityLogs = await User.aggregate([
            {$match: {_id:new mongoose.Types.ObjectId(req.params.id)}},
            {   $lookup: {
                from: "Activity",
                localField: "logs",
                foreignField: "_id",
                pipeline: [
                    {
                        $match: {
                            createdAt : {$gt: yesterday, $lt: today}
                        }
                    }
                ],
                as: "user_activity"
            }}
        ])
        console.log(userDate.toLocaleString())
        console.log(tomorrow.toLocaleString())
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }
        
        res.status(200).json({
            success: true,
            activityLogs,
            date
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: error.message
        })
    }
}

exports.getExactActivitiesAgg = async (req, res) => {
    try {
        const date = new Date()
        const userDate = new Date(new Date(req.body.date).setHours(0,0,0))
        const tomorrow = new Date(new Date(new Date(new Date(date
                                                                .setDate(userDate.getDate()))
                                                                .setMonth(userDate.getMonth()))
                                                                .setFullYear(userDate.getFullYear()))
                                                                .setHours(23,59,59))
        
        // console.log(userDate.toLocaleString(), "userdate", tomorrow.toLocaleString(), "tomorrow" );

        const activityLogs = await User.aggregate([
            {
                $lookup: {
                    from: "Activity",
                    localField: "email",
                    foreignField: "user",
                    pipeline: [
                        {
                            $match: {
                                createdAt: {$gte: userDate, $lte: tomorrow},
                            }
                        }
                    ],
                    as: "user_activity"
                }
            }
        ])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            status:false,
            message: error.message
        })
    }
}

exports.getExactActivityAgg = async (req, res) => {
    try {
        const date = new Date()
        const userDate = new Date(new Date(req.body.date).setHours(0,0,0))
        const tomorrow = new Date(new Date(new Date(new Date(date
                                                                .setDate(userDate.getDate()))
                                                                .setMonth(userDate.getMonth()))
                                                                .setFullYear(userDate.getFullYear()))
                                                                .setHours(23,59,59))
        
        console.log(userDate.toLocaleString(), "userdate", tomorrow.toLocaleString(), "tomorrow" );

        const activityLogs = await User.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(req.params.id)}},
            {
                $lookup: {
                    from: "Activity",
                    localField: "email",
                    foreignField: "user",
                    pipeline: [
                        {
                            $match: {
                                createdAt: {$gte: userDate, $lte: tomorrow},
                            }
                        }
                    ],
                    as: "user_activity"
                }
            }
        ])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }
        res.status(200).json({
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            status:false,
            message: error.message
        })
    }
}

exports.getExactActivitiesPop = async (req, res) => {
    try {
        const date = new Date()
        const userDate = new Date(new Date(req.body.date).setHours(0,0,0))
        const tomorrow = new Date(new Date(new Date(new Date(date
                                                                .setDate(userDate.getDate()))
                                                                .setMonth(userDate.getMonth()))
                                                                .setFullYear(userDate.getFullYear()))
                                                                .setHours(23,59,59))
        
        const activityLogs = await User.find()
                                           .populate({
                                            path: "logs",
                                            match: {
                                                "createdAt": {$gte: userDate, $lte: tomorrow},
                                            }
                                        })
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error,Status:false
        })
    }
}

exports.getExactActivityPop = async (req, res) => {
    try {
        const date = new Date()
        const userDate = new Date(new Date(req.body.date).setHours(0,0,0))
        const tomorrow = new Date(new Date(new Date(new Date(date
                                                                .setDate(userDate.getDate()))
                                                                .setMonth(userDate.getMonth()))
                                                                .setFullYear(userDate.getFullYear()))
                                                                .setHours(23,59,59))
        
        const activityLogs = await User.find({_id: req.params.id})
                                           .populate({
                                            path: "logs",
                                            match: {
                                                "createdAt": {$gte: userDate, $lte: tomorrow},
                                            }
                                        })
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            success: true,
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            status:false,
            message: error.message
        })
    }
}

exports.findUserActivities = exports.getExactActivitiesAgg = async (req, res) => {
    try {
        const givenFromDate = req.body.fromDate.split("-")
        const givenToDate = req.body.toDate.split("-")
        console.log(givenFromDate, givenToDate);
        const fromDate = new Date(givenFromDate[0], givenFromDate[1] - 1, givenFromDate[2])
        const toDate = new Date(givenToDate[0], givenToDate[1] - 1, givenToDate[2])
        console.log(fromDate, toDate);

        const activityLogs = await User.aggregate([
            {
                $lookup: {
                    from: "Activity",
                    localField: "email",
                    foreignField: "user",
                    pipeline: [
                        {
                            $match: {
                                createdAt: {$gte: fromDate, $lte: toDate},
                            }
                        }
                    ],
                    as: "user_activity"
                }
            },
            {
                $unwind: {
                    path: "$user_activity"
                }
            },
            {
                $project: {
                    "name": 1,
                    "email": 1,
                    "user_activity": 1
                }
            }
        ])
        
        if (!activityLogs) {
            res.status(404).json({
                message: "No activities found"
            })
        }

        res.status(200).json({
            activityLogs
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            status:false,
            message: error.message
        })
    }
}
