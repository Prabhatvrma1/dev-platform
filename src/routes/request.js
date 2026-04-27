const express = require('express');
const requestrouter = express.Router();
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');




requestrouter  .post("/sendconnectionrequest" , auth,  async (req, res) => {
    try{
        const user = req.user;
        console.log("send connection request api called");
        res.send(user.firstName + " " + "connection request sent successfully");
    }
    catch(err){
        res.status(500).send("for send connection request something went wrong" + err.message);
    }
});




module.exports = requestrouter;