var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    message: String,
}, { timestamps: true });

module.exports = Chat = mongoose.model("chat", ChatSchema);
