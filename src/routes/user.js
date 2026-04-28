const mongoose = require("mongoose");
const express = require('express');
const userrouter = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const ConnectionRequest = require("../models/connectionrequest");
const connectionrequestmodel = require("../models/connectionrequest");


userrouter.get("/user/request", auth , async (req, res) =>{
    try{

        //login user 
        // touser = loginuser
        //status = interested
        const loginuser = req.user;
        //const touserid = req.user.touserid;
        const connectionreq = await  connectionrequestmodel.find({
            touserid:loginuser._id,
            status: "interested",
        });

        if( !connectionreq) {
            throw new Error(" somthing wrong with connectoion req " + err.message);

        }
    
        res.send(connectionreq);

 

    }
    catch(err){
        res.status(400).send(" something went wrong with userrouter " + err.message);
    }

});






module.exports = userrouter;