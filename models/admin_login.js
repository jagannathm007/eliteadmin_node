var mongoose = require("mongoose");
var adminLogin = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: true
    },
    password: {
        type: String,
        default: null,
        required: true
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('adminlogin', adminLogin);
