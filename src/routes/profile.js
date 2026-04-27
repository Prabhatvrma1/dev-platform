const express = require('express');
const profileroutes = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');


profileroutes.get("/profile", auth , async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(500).send("for profile something went wrong" + err.message);
    } 
});








module.exports = profileroutes;