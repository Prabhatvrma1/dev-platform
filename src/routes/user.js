const mongoose = require("mongoose");
const express = require('express');
const userrouter = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
const ConnectionRequest = require("../models/connectionrequest");
const connectionrequestmodel = require("../models/connectionrequest");


userrouter.get("/user/request/recieved", auth , async (req, res) =>{
    try{

        //login user 
        // touser = loginuser
        //status = interested
        const loginuser = req.user;
        //const touserid = req.user.touserid;
        const connectionreq = await  connectionrequestmodel.find({
            touserid:loginuser._id,
            status: "interested",
        }).populate("fromuserid", ["firstName", "lastName" , "photourl","age" , "skills"])

        if( !connectionreq) {
            throw new Error(" somthing wrong with connectoion req for recieved " + err.message);

        }
    
        res.send(connectionreq);
    }
    catch(err){
        res.status(400).send(" something went wrong with userrouter " + err.message);
    }
});

userrouter.get("/user/request/connection", auth , async (req, res) =>{
    try{

        //login user 
        // touser = loginuser
        //status = interested
        const loginuser = req.user;
        //const touserid = req.user.touserid;
        const connectionreq = await connectionrequestmodel.find({
    $or: [
        { touserid: loginuser._id, status: "accepted" },
        { fromuserid: loginuser._id, status: "accepted" }
    ]
        })
        .populate("fromuserid", ["firstName", "lastName", "photourl", "age", "skills"])
        .populate("touserid", ["firstName", "lastName", "photourl", "age", "skills"]);
        const data = connectionreq.map((row) => {
        if (row.fromuserid._id.toString() === loginuser._id.toString()) {
             return row.touserid;
        } else {
            return row.fromuserid; 
        }
        }); 
        if( !connectionreq) {
            throw new Error(" somthing wrong with connectoion req for connection api  " + err.message);

        }
    
        res.send(data);
    }
    catch(err){
        res.status(400).send(" something went wrong with userrouter " + err.message);
    }
});

userrouter.get("/user/request/feed" , auth , async (req,res) =>{
    try{

        //avoid his own  card , connection , accpedt or rejected or interested or not interested
        const loginuser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit >50 ? 50 : limit;
        const skip = (page -1 ) * limit;


        //find connection req send or recieved
        const connectionRequest = await connectionrequestmodel.find({
            $or: [
                { fromuserid: loginuser._id },
                { touserid: loginuser._id }
            ]
        }).select("fromuserid touserid");
        // .populate("fromuserid", "firstName lastName")
        // .populate("touserid", "firstName lastName");

        const hideuserfromfeed = new Set();
        connectionRequest.forEach(req => {
            hideuserfromfeed.add(req.fromuserid.toString());
            hideuserfromfeed.add(req.touserid.toString());
        });

        const user = await User.find({
            $and:[
                {_id : {$nin: Array.from(hideuserfromfeed) }},
                {_id : { $ne: loginuser._id}},
            ]
        }).select("firstName lastName photourl age skills").skip(skip).limit(limit);
        // console.log(user);
        res.json(user);

    }
    catch(err){
        res.status(400).json({ message : "something went wrong for feed" + err.message });
    }


});






module.exports = userrouter;