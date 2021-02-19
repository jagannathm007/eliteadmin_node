var mongoose = require("mongoose");

var packageContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isFragile: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('packagecontents', packageContentSchema);