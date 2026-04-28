const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userschema = new mongoose.Schema(
{ 
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
        validate(value){
            try{
                if(!validator.isEmail(value)){
                    throw new Error("invalid email" + value);
                }
            } catch (err) {
                throw new Error("invalid email");
            }
        },  
    },
    password: { 
        type : String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong enough");
            }
        }
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
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url");
            }
        }
    },  
    about: {
        type : String,
        default: "this is a deault about section"
    },
    skills: {
        type : [String]
    },
    
}, 
{
    timestamps: true    
}
);

userschema.index({firstName:1 , lastName: 1});

userschema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({ userid: user._id },"secretkeyhawww" , { expiresIn: '1d' });
    return token;
};

userschema.methods.validatepassword = async function(passwordibyuser) {
    const user = this;
    const passwordvalid = await bcrypt.compare(passwordibyuser, user.password);
    return passwordvalid;
};


const Usermodel = mongoose.model("User", userschema);
module.exports = Usermodel;