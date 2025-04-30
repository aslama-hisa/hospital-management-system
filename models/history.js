var mongoose = require('mongoose');
var HistorySchema = new mongoose.Schema(
    {
        name: String,
        phone:String,
        appoinment: String,
        message:String
    },
    { timestamps: true }
);
module.exports = mongoose.model('history', HistorySchema, 'history');