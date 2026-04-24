const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
 
    firstName: {
        type : String
    }   ,
    lastName: {
        type : String
    },
    email: {
        type : String
    },
    password: { 
        type : String
    },
    age: {
        type : Number
    },
    gender: {
        type : String
    }
});


const Usermodel = mongoose.model("User", userschema);
module.exports = Usermodel;