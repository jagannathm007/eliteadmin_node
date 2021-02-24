var mongoose = require("mongoose");

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

module.exports = mongoose.model('chats', chatSchema);