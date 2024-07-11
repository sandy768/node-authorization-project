const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AuthSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})
const AuthModel=new mongoose.model('Details',AuthSchema);
module.exports=AuthModel;