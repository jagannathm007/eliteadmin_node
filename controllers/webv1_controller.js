var config = require("../config");
//import schema models
var areaSchema = require("../models/area");
var userSchema = require("../models/users");
var adminLoginSchema = require("../models/admin_login");
var packageContentsSchema = require("../models/package_contents");

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

//Area
exports.getServingAreas = async function (req, res, next) {
    try {

        var areaList = await areaSchema.paginate({}, {
            page: req.body.page || 1,
            limit: req.body.limit || 10
        });
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

exports.getServingAreasByDate = async function (req, res, next) {
    try {
        var areaList = await areaSchema.paginate({
            createdAt: {
                $gte: req.body.fDate,
                $lt: req.body.tDate
            }
        }, {
            page: req.body.page || 1,
            limit: req.body.limit || 10
        });
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
        console.log(err.message);
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


//Package Contents
exports.getPackageContents = async function (req, res, next) {
    try {
        var packageContentsList = await packageContentsSchema.find();
        if (areaList.length > 0) {
            res.status(200).json({
                Message: "Package Contents Found!",
                Data: packageContentsList,
                IsSuccess: true
            });
        } else {
            res.status(200).json({
                Message: "No, Package Contents Found!",
                Data: packageContentsList,
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

exports.addEditPackageContents = async function (req, res, next) {
    try {
        const { id, title, isFragile } = req.body;
        if (id == "0") {
            var newPackageContents = new packageContentsSchema({ title: title, isFragile: isFragile });
            await newPackageContents.save();
            res.status(200).json({
                Message: "Package Contents Saved!",
                Data: 1,
                IsSuccess: true
            });
        } else {
            await packageContentsSchema.findByIdAndUpdate(id, { title: title, isFragile: isFragile });
            res.status(200).json({
                Message: "Package Contents Saved!",
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

exports.deletePackageContent = async function (req, res, next) {
    try {
        const { id } = req.body;
        await packageContentsSchema.findByIdAndDelete(id);
        res.status(200).json({
            Message: "Package Contents Deleted!",
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

//Customer
exports.getCustomers = async function (req, res, next) {
    try {
        var userList = await userSchema.find();
        if (userList.length > 0) {
            res.status(200).json({
                Message: "Customer Found!",
                Data: userList,
                IsSuccess: true
            });
        } else {
            res.status(200).json({
                Message: "No Customer Found!",
                Data: userList,
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

exports.addCustomer = async function (req, res, next) {
    try {
        const { name, mobile, signupBy, email } = req.body;
        var newUser = new userSchema({
            name: name,
            mobile: mobile,
            signupBy: signupBy,
            email: email
        });
        await newUser.save();
        res.status(200).json({
            Message: "Package Contents Saved!",
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