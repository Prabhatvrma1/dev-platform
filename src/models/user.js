const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
 
    firstName: {
        type : String,
        required: true
    }   ,
    lastName: {
        type : String,
        required: true
    },
    email: {
        type : String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: { 
        type : String,
        required: true
    },
    age: {
        type : Number,
        min: 18,
        max: 100,
    },
    gender: {
        type : String,
        lowercase: true,
        validate(value){
            if(!["male","female", "other"]){
                throw new Error("invalid gender");
            }
        },
          
    },
    photourl: {
        type : String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },  
    about: {
        type : String,
        default: "this is a deault about section"
    },
    skills: {
        type : [String]
    },
    
}, 
{timestamps: true    }

);
const Usermodel = mongoose.model("User", userschema);
module.exports = Usermodel;