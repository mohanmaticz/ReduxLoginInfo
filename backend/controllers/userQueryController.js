const UserQuery = require("../models/userQueryModel")


exports.registerUser = async (req, res) => {
    try {
        const {name, email, position, gender, role, activity} = req.body

        const user = {
            name,
            email,
            position,
            gender,
            role,
            activity
        }
        const newUser = await new UserQuery(user) 
        await newUser.save()

        res.status(200).json({
            success: true,
            message: "Successfully user created",
            user: newUser,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await UserQuery.find()

        if (users.length === 0) {
            res.status(200).json({
                success: true,
                message: "No users have registered"
            })
        }

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await UserQuery.findOne({_id: id})

        if (!user) {
            res.status(200).json({
                success: true,
                message: "No user found with the ID"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.getUsersActivity = async (req, res) => {
    try {
        const fromDate = new Date(req.body.fromDate)
        const toDate = new Date(req.body.toDate)

        // const user = await UserQuery.find({
        //     // 'activity.createdAt' : {$gt: fromDate, $lte: toDate}
        //     activity: {
        //         $elemMatch: {
        //             createdAt: {
        //                 $gte: fromDate,
        //                 $lte: toDate
        //             }
        //         }
        //     }
        // })

        const user = await UserQuery.find(
            {},
            {
                name: 1,
                email: 1,
                activity: {
                    $filter: {
                        input: "$activity",
                        as: "activity",
                        cond: {
                            $and: [
                                { $gte: ["$$activity.createdAt", fromDate] },
                                { $lte: ["$$activity.createdAt", toDate] }
                            ]
                        }
                    }
                }
            }
        )

        res.status(200).json({
            success: false,
            fromDate,
            toDate,
            user
        })        
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}

exports.getUserActivity = async (req, res) => {
    try {
        const {id} = req.params
        const fromDate = new Date(req.body.fromDate)
        const toDate = new Date(req.body.toDate)


        const user = await UserQuery.findOne(
            {_id: id},
            {
                name: 1,
                email: 1,
                activity: {
                    $filter: {
                        input: "$activity",
                        as: "activity",
                        cond: {
                            $and: [
                                { $gte: ["$$activity.createdAt", fromDate] },
                                { $lte: ["$$activity.createdAt", toDate] }
                            ]
                        }
                    }
                }
            }
        )
        
        res.status(200).json({
            success: false,
            fromDate,
            toDate,
            user, 
        })        
    } catch (error) {
        res.status(200).json({
            success: false,
            error: error.message
        })
    }
}
