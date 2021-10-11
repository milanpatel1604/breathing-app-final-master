const Notification = require('../models/NotificationsModel');
const CrudNotify = require("../models/CrudNotificationModel");

const fs = require('fs');
const path = require('path');
var staticFilesPath = path.join(__dirname, '../static');

const dotenv = require("dotenv").config();


exports.notificationsToShow = async (req, res) => {
    const user_id = await req.user.id;
    const user_noti = await CrudNotify.findOne({ user_id: user_id }, async (err, docs) => {
        if (err) {
            return res.status(400).json({ status: 400, error: err });
        }
    })
    var notiToShow = [];
    await user_noti.notifications.forEach(async (element) => {
        if (element.shown == false) {
            notiToShow.push(element);
            await CrudNotify.updateOne({ user_id: user_id, 'notifications._id': element._id },
                {
                    $set: {
                        'notifications.$.shown': true
                    }
                }, async (err) => {
                    if (err) {
                        return res.status(400).json({ status: 400, error: err });
                    }
                })
        }
    });
    return res.status(200).json({ status: 200, notification_objects: notiToShow });
}

exports.allNotifications = async (req, res) => {
    const user_id = await req.user.id;
    const user_noti = await CrudNotify.findOne({ user_id: user_id }, async (err) => {
        if (err) {
            return res.status(400).json({ status: 400, error: err });
        }
    })
    let date_ob = new Date();
    const presentDate = ("0" + date_ob.getDate()).slice(-2);
    const yesterdayDate = ("0" + (date_ob.getDate() - 1)).slice(-2);
    const presentMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const presentYear = date_ob.getFullYear();
    const fullPresentDate = presentDate + "/" + presentMonth + "/" + presentYear;
    const fullYesterdayDate = yesterdayDate + "/" + presentMonth + "/" + presentYear;
    var results = []
    await Promise.all(user_noti.notifications.map(async (element) => {
        if (yesterdayDate >= 1) {
            console.log(element.date, fullPresentDate, fullYesterdayDate);
            if (element.date == fullPresentDate || element.date == fullYesterdayDate) {
                console.log("pushing")
                results.push(element);
            }
        }
    }))
    res.status(200).json({ status: 200, results: results });
}

exports.deleteNotifications = async (req, res) => {
    const user_id = await req.user.id;
    let date_ob = new Date();
    const dayBeforeYesterdayDate = ("0" + (date_ob.getDate() - 2)).slice(-2);
    const presentMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const presentYear = date_ob.getFullYear();
    const fulldayBeforeYesterdayDate = dayBeforeYesterdayDate + "/" + presentMonth + "/" + presentYear;
    if (dayBeforeYesterdayDate >= 0 + 1) {
        await CrudNotify.updateOne({user_id: user_id}, { $pull: {'notifications':{ 'date': fulldayBeforeYesterdayDate}}}, async (err) => {
            if (err) {
                return res.status(400).json({ status: 400, error: err });
            }
        })
        return res.status(200).json({ status: 200, message: "notifications deleted" });
    }
}