const mongoose=require('mongoose')
const { Schema, model } = mongoose;

const userSchema=new Schema({
    fullName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    phoneno:{
        type:String,
        required:true,
    },
    ratings:{
        type:[{
            Number,
            min:0,
            max:5,
        }],
    }
    
},{timestamps:true})

const UserModel=model('user',userSchema)

module.exports=UserModel;