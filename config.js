require("dotenv").config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var users = require("./models/users");


//Generate Access Token.
function generateAccessToken(userData) {
    return jwt.sign(userData, process.env.LOGIN_TOKEN, { expiresIn: process.env.LOGIN_EXP_IN_DAYS + 'd' });
}

//Authenticate Access Token.
function authenticated(req, res, next) {
    const bearerHeader = req.headers['Authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.LOGIN_TOKEN, (err, auth) => {
            if (err) {
                res.status(401).json({
                    Message: "Unauthorised request",
                    Data: 0,
                    IsSuccess: false
                });
            } else {
                req.token = auth;
            }
        });
        next();
    } else {
        res.status(401).json({
            Message: "Unauthorised request",
            Data: 0,
            IsSuccess: false
        });
    }
}

//Connecting with mongoDB Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection
    .once('open', () => console.log("Well done! , connected with mongoDB database"))
    .on('error', error => console.log("Opps! database connection error:" + error));

module.exports = {
    generateAccessToken,
    authenticated,
    mongoose
}