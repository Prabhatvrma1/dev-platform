const express = require('express');
const authroutes = express.Router();
const {validatesignupdata } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const validator = require('validator');



authroutes.post("/signup" , async (req, res) => {
    try{

    //validate the signup data
    validatesignupdata(req);

    const password = req.body.password;

    //encrypt the password
    const passwordhash = await bcrypt.hash(password, 10);

    //create a new user in the database
    const userobj = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordhash,
        
    });
    await userobj.save();
    res.send("user created successfully");
    }
    catch(err){
    console.log(err.message);
    res.status(400).send(err.message);
    }
}

);  


authroutes.post("/login", async (req, res) => {
    try{
        const emailid = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: emailid });
        if(!user){
            return res.status(400).send("invalid email id or password");
        }
        const passmatch = await user.validatepassword(password);
        if(passmatch){
            //create a jwt token 
            const token = await user.getJWT();
            //add tocken to cookie and send the response back to user 
            const decodedmessage = await jwt.verify(token, "secretkeyhawww");
            const { _id } = decodedmessage;
            res.cookie("token", token, { expires: new Date(Date.now() + 86400000), httpOnly: true });
            //console.log("decoded message", decodedmessage);
             res.send("login successful" + user);
        } 
        else{
            return res. status(400).send("invalid email id or password");

        }
    }
    catch(err){
        res.status(500).send("for login something went wrong" + err.message);
    }
});


authroutes.post("/logout", async (req,res)  => {
    try{
        //res.clearCookie("token");
        res.cookie("token", null, { expires: new Date(Date.now()), });
        //diff between clear cookie  and res.cookie code is 
        res.send("logout successful");
        console.log("logout api called and logout successful");

    }
    catch(err){
        res.status(500).send("for logout something went wrong" + err.message);
    }

});













module.exports = authroutes;