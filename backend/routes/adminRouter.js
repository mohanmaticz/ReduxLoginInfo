const express = require("express");
const router = express.Router();
const {authVerify, checkAdmin} = require("../helper/authVerify");

const {
    getActivities,
    getActivitiesAgg,
    getActivity,
    getActivityAgg,
    getTodayActivitiesAgg,
    getTodayActivityAgg,
    getTodayActivitiesPop,
    getTodayActivityPop,
    getExactActivitiesAgg,
    getExactActivityAgg,
    getExactActivitiesPop,
    getExactActivityPop,
    findUserActivities
} = require("../controllers/adminController");

router.get("/pop", authVerify, checkAdmin, getActivities)
router.get("/agg", authVerify, checkAdmin, getActivitiesAgg)
router.get("/pop/:id", authVerify, checkAdmin, getActivity)
router.get("/agg/:id", authVerify, checkAdmin, getActivityAgg)

router.get("/today/agg", authVerify, checkAdmin, getTodayActivitiesAgg)
router.get("/today/agg/:id", authVerify, checkAdmin, getTodayActivityAgg)
router.get("/today/pop", authVerify, checkAdmin, getTodayActivitiesPop)
router.get("/today/pop/:id", authVerify, checkAdmin, getTodayActivityPop)

router.get("/date/agg", authVerify, checkAdmin, getExactActivitiesAgg)
router.get("/date/agg/:id", authVerify, checkAdmin, getExactActivityAgg)
router.get("/date/pop", authVerify, checkAdmin, getExactActivitiesPop)
router.get("/date/pop/:id", authVerify, checkAdmin, getExactActivityPop)

router.get("/find_date", findUserActivities)

module.exports = router;