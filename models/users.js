var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    profileImg:{
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    signupBy: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('users', userSchema);