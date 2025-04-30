var mongoose=require('mongoose');
var AdminSchema=new mongoose.Schema(
    {
        name:String,
        email:String,
        pass:String
    },
    {timestamps:true}
);
module.exports=mongoose.model('Admin',AdminSchema,'Admin');