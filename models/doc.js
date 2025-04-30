var mongoose = require('mongoose');
var DocSchema = new mongoose.Schema(
    {
       // _id: {type:mongoose.Schema.Types.ObjectId,ref:'Apo' },
        name: String,
        department: String,
        email: String,
        password: String
    },
    { timestamps: true }
);
module.exports = mongoose.model('Doc', DocSchema, 'Doc');