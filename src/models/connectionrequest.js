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


},{ timestamps:true });

connectionRequestSchema.index({fromuserid: 1 , touserid: 1});

connectionRequestSchema.pre("save", function(next){
    const connectionrequest = this;

    if (connectionrequest.fromuserid.equals(connectionrequest.touserid)) {
        throw new Error("dont send request to yourself");
    }

});

const connectionrequestmodel =  new mongoose.model("connectionrequestmodel", connectionRequestSchema);
module.exports = connectionrequestmodel;