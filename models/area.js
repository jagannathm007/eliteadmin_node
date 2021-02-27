var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

var areaSchema = new mongoose.Schema({
    areaName: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});
areaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('areas',areaSchema);