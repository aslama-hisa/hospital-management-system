var mongoose = require('mongoose');
var ApoSchema = new mongoose.Schema(
    {
        name: String,
        phone:String,
        date:String,
        time:String,
        email: String,
        dept:String,
        doc:String,
        message:String
    },
    { timestamps: true }
);
module.exports = mongoose.model('Apo', ApoSchema, 'Apo');