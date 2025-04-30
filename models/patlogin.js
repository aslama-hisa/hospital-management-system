var mongoose=require('mongoose');
var PatSchema=new mongoose.Schema(
    {
        name:String,
        age:String,
        email:{
           type: String,
           unique:true
        },
        password:String
    },
    {timestamps:true}
);
module.exports=mongoose.model('Pat',PatSchema,'Pat');