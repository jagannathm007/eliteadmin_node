var config = require("../config");
//import schema models
var adminLoginSchema = require("../models/admin_login");

exports.loginRequest = async function (req, res, next) {
    try {
        const { username, password } = req.body;
        var findAdmin = await adminLoginSchema.find({ name: username, password: password });
        console.log(findAdmin.length);
        if (findAdmin.length == 1) {
            var accessToken = config.generateAccessToken({id:findAdmin[0]._id});
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

exports.createAdmin = async function (req, res, next) {
    try {
        const { name, password } = req.body;
        var newAdmin = new adminLoginSchema({
            name: name,
            password: password
        });
        await newAdmin.save();

        res.status(200).json({
            Message: "New Admin Added",
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