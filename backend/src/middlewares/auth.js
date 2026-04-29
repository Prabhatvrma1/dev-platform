const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const User = require('../models/user');

const auth = async (req, res, next) => { 

try{
    
    const token = req.cookies.token;
    if(!token){
        throw new Error('not valid token');
    }
    const decodeddata = await jwt.verify(token, "secretkeyhawww");
    
    const { userid } = decodeddata;
    const user = await User.findById(userid);
    if(!user){
        throw new Error('User not found');
    }
    req.user = user;
    next();
}
    catch(err){
        res.status(400).json({error: ' Auth failed' + err.message});
    }
    

};

module.exports = auth;