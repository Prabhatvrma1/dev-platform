const validator = require("validator"); 

const validatesignupdata = (req) => {
    const{ firstName, lastName, email, password } = req.body;
    if( !firstName || !lastName || !email || !password){
        throw new Error("missing required fields");
    }
    else if( firstName.length < 2 || lastName.length < 2){
        throw new Error("firstName and lastName should be at least 2 characters long");
    }
    else if( !validator.isEmail(email)){
        throw new Error("invalid email");
    }
    else if( !validator.isStrongPassword(password)){
        throw new Error("password is not strong enough");
    }
};

const validateprofiledata = (req) => {
try{
    const allowedfields =  ["firstName", "lastName", "age", "gender", "photourl", "about", "skills"];
    const data = req.body;
    const isvalidOperation = Object.keys(data).every((key) =>
        allowedfields.includes(key)
    );
    if( !isvalidOperation){
        throw new Error("no valid fields in profile data");
    }
    

}
    catch(err){
        throw new Error(" validator failed" + err.message);
    }

}


module.exports = 
{
    validatesignupdata , validateprofiledata
};
