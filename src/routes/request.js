const express = require('express');
const requestrouter = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const ConnectionRequest = require("../models/connectionrequest");

requestrouter.post("/request/send/:status/:touserid" , auth,  async (req, res) => {
    try{
        const fromuserid = req.user._id;
        const  touserid = req.params.touserid;
        const status = req.params.status;
        const allowedstatus = [ "ignored", "interested"];
        if( !allowedstatus.includes(status)){
            return res.status(400).json( {message: "invalid status type" + status});
        }
        const request = new ConnectionRequest({
            fromuserid,
            touserid,
            status
        });

        //check if existing connection

        const existingconnectionrequest = await ConnectionRequest.findOne({
            $or: [ 
                {fromuserid: fromuserid , touserid: touserid  },
                { fromuserid: touserid , touserid: fromuserid },
                { fromuserid : fromuserid, touserid: fromuserid}
            ], 
        })
        if(existingconnectionrequest){
            return res.status(400).json({message: "bad request /already exist "});
        }

        const useridexisted = await User.findById(touserid);
        if( !useridexisted){
            return res.status(400).json({message : "user not registered"});
        }

       const data = await request.save();

        const touser = await User.findById(touserid);

        res.json({
            message: req.user.firstName + " is " + status + " in " + touser.firstName + "'s profile", data
        });
    }
    catch(err){
        res.status(400).send("for send connection request something went wrong" + err.message);
    }
});


requestrouter.post("/request/:status/:requestid", auth, async (req, res) => {
    try {
        const { status, requestid } = req.params;
        const loggedInUser = req.user;

        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "invalid status type"
            });
        }

        const connectionReq = await ConnectionRequest.findOne({
            _id: requestid,
            touserid: loggedInUser._id,
            status: "interested"
        });

        if (!connectionReq) {
            return res.status(404).json({
                message: "connection request not found"
            });
        }

        connectionReq.status = status;

        const data = await connectionReq.save();

        res.json({
            message: `request ${status}`,
            data
        });

    } catch (err) {
        res.status(400).send("error updating request: " + err.message);
    }
});



module.exports = requestrouter;