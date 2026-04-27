const express = require('express');
const profileroutes = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const { validatesignupdata, validateprofiledata } = require('../utils/validation');



profileroutes.get("/profile/view", auth , async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("for profile something went wrong" + err.message);
    } 
});

profileroutes.patch("/profile/edit", auth, async (req, res) => {
    try {
        validateprofiledata(req);  


        const user = req.user;
        const data = req.body;

        Object.keys(data).forEach((key) => {
            user[key] = data[key];
        });

        await user.save();

        res.send("Profile updated successfully");
        res.json()

    } catch (err) {
        res.status(400).send("Error with profile update " + err.message);
    }
});

//password forgot







module.exports = profileroutes;