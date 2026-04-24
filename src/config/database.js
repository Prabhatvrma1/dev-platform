const mongoose = require('mongoose');

const connectdb = async()=>{
    await mongoose.connect("mongodb+srv://hrprabhatorignal_db_user:sdfU2UquXeb7QPMo@prabhatdb.iwgaxn3.mongodb.net/devtinder");

}

connectdb().then( ()=>{
    console.log("database connected");
}).catch((err) =>{
    console.log("database connection failed");
    console.log(err);
});


module.exports = connectdb;