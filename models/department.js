var mongoose=require('mongoose');
var DeptSchema=new mongoose.Schema(
    {
        name:String
    },
    {timestamps:true}
);
module.exports=mongoose.model('department',DeptSchema,'department');