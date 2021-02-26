var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

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
packageContentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('packagecontents', packageContentSchema);