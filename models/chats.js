var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

var chatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Types.ObjectId,
    },
    to: {
        type: mongoose.Types.ObjectId,
    },
    message: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        default: Date.now()
    }
});
chatSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('chats', chatSchema);