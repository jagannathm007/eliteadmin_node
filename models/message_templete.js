var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

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
messageTempleteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('messagetempletes',messageTempleteSchema);