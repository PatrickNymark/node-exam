var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    description: String,
}, { timestamps: true });

module.exports = Post = mongoose.model("post", PostSchema);
