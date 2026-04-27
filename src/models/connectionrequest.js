const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({

    fromuserid:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    touserid : {
        type : mongoose.Schema.Types.ObjectId,
        required:true ,
    },
    status : {
        type : String,
        lowercase : true,
        required: true,
        enum :  {
            values: ["ignored", "rejected", "accepted", "interested"],
            message : `{VALUE} is incorrect status type`

        }
    }


},{ Timestamp:true })

const connectionrequestmodel =  new mongoose.model("connectionrequestmodel", connectionRequestSchema);
module.exports = connectionrequestmodel;