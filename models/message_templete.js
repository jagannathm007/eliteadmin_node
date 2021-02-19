var mongoose = require("mongoose");

var messageTempleteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('messagetempletes',messageTempleteSchema);