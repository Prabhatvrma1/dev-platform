const mongoose = require('mongoose');

const connectdb = async()=>{
    await mongoose.connect("mongodb+srv://hrprabhatorignal_db_user:sdfU2UquXeb7QPMo@prabhatdb.iwgaxn3.mongodb.net/devtinder");

}




module.exports = connectdb;