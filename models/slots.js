var mongoose = require('mongoose');
var slotsSchema = new mongoose.Schema(
    {
        doctor: String,
        date: String,
        slot1: {
            type: String,
            default: null
        },
        slot2: {
            type: String,
            default: null
        },
        slot3: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('slots', slotsSchema, 'slots');