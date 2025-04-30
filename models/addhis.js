var mongoose = require('mongoose');
var HistorSchema = new mongoose.Schema(
    {
        name: String,
        phone:String,
        date: String,
        message:String
    },
    { timestamps: true }
);
module.exports = mongoose.model('addhis', HistorSchema, 'addhis');