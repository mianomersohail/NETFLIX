const mongoose=require('mongoose')

const userschame=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true})

const UserSchemas=mongoose.model('UserSchemas',userschame);
module.exports=UserSchemas;