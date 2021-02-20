var config = require("../config");
//import schema models
var adminLoginSchema = require("../models/admin_login");
var areaSchema = require("../models/area");

exports.loginRequest = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        var findAdmin = await adminLoginSchema.find({ name: username, password: password });
        console.log(findAdmin.length);
        if (findAdmin.length == 1) {
            var accessToken = config.generateAccessToken({ id: findAdmin[0]._id });
            res.json({
                Message: "Login Credential Matched!",
                Data: [{
                    userData: findAdmin[0],
                    accessToken: accessToken
                }],
                IsSuccess: true
            });
        } else {
            res.json({
                Message: "Invalid Login Credentials!",
                Data: [],
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
}

exports.getServingAreas = async function (req, res, next) {
    try {
        var areaList = await areaSchema.find();
        if (areaList.length > 0) {
            res.status(200).json({
                Message: "Serving Areas Found!",
                Data: areaList,
                IsSuccess: true
            });
        } else {
            res.status(200).json({
                Message: "No, Serving Areas Found!",
                Data: areaList,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
}

exports.addEditServingArea = async function (req, res, next) {
    try {
        const { id, areaName } = req.body;
        if (id == "0") {
            var newArea = new areaSchema({ areaName: areaName });
            await newArea.save();
            res.status(200).json({
                Message: "Serving Areas Saved!",
                Data: 1,
                IsSuccess: true
            });
        } else {
            await areaSchema.findByIdAndUpdate(id, { areaName: areaName });
            res.status(200).json({
                Message: "Serving Areas Saved!",
                Data: 1,
                IsSuccess: true
            });
        }
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
}

exports.deleteServingArea = async function (req, res, next) {
    try {
        const { id } = req.body;
        await areaSchema.findByIdAndDelete(id);
        res.status(200).json({
            Message: "Serving Areas Deleted!",
            Data: 1,
            IsSuccess: true
        });
    } catch (err) {
        res.status(500).json({
            Message: err.message,
            Data: 0,
            IsSuccess: false
        });
    }
}