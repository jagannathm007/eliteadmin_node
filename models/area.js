var mongoose = require("mongoose");

var areaSchema = new mongoose.Schema({
    areaName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('areas',areaSchema);