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


},{ Timestamp:true });

connectionRequestSchema.pre("save", function(){
    const connectionrequest = this;
    //check from user id same as to userid
    if(connectionrequest.fromuserid.equals(connectionrequest.touserid))
    {
        throw new Error(" dont send request to yourself");
    }
    next(); 
})

const connectionrequestmodel =  new mongoose.model("connectionrequestmodel", connectionRequestSchema);
module.exports = connectionrequestmodel;