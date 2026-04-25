const express = require('express');
const http = require('http');
const connectdb = require('./config/database');
const app = express();
const User = require('./models/user');
const { userInfo } = require('os');
app.use(express.json()); //this will parse the json data from the request body and make it available in req.body    
const validator = require('validator');
const validatesignupdata = require('./utils/validation');
const auth = require('./middlewares/auth');
const bcrypt = require('bcrypt');
app.use(express.json());

//sign up page code
app.post("/signup" , async (req, res) => {
    try{


    //validate the signup data
    validatesignupdata(req);

    const password = req.body.password;

    //encrypt the password
    const passwordhash = await bcrypt.hash(password, 10);

    //create a new user in the database
    const userobj = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : passwordhash,
        
    });
    await userobj.save();
    res.send("user created successfully");
    }
    catch(err){
    console.log(err.message); // 👈 ADD THIS
    res.status(400).send(err.message); // show real error
    }
}

);  
app.patch("/user/:userid", async (req, res) => {
    const userid = req.params?.userid;
    const updateData = req.body;
    
    try{    
        const user = await User.findByIdAndUpdate(userid, updateData, { new: true, runValidators: true });
        res.send(user); 
        const allowed_updated = [ "age", "gender", "photourl", "about", "skills" ];
        const isupadateallowed = Object.keys(updateData).every((key) => allowed_updated.includes(key));
        if(!isupadateallowed){
        //return res.status(400).send("invalid update");
            throw new Error("invalid update");
        }
        if(updateData.skills.size > 10){
            throw new Error ("skills can not more thann 10");
        }
        // if(updateData.email && !validator.isEmail(updateData.email)){
        //     throw new Error("invalid email");
        // }
    }catch(err){
        res.status(500).send("for update user something went wrong");
    }
}); 


// login page cdoe
app.post("/login", async (req, res) => {
    try{
        const emailid = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: emailid });
        if(!user){
            return res.status(400).send("invalid email id or password");
        }
        const passmatch = await bcrypt.compare(password, user.password);
        if(!passmatch){
            return res.status(400).send("invalid email id or password");
        }
        res.send("login successful");
    }

    catch(err){
        res.status(500).send("for login something went wrong");
    }
});

connectdb().then( ()=>{
    console.log("database connected");
    app.listen(3000, ( req, res) =>{
    console.log('Server is running on port 3000');
    });
}).catch((err) =>{
    console.log("database connection failed");
    console.log(err);
});





 






// //https methods - post , get ,patch , delete
// if you use app.use / user here igt will then just use this one and all the api  will get uselesss
// app.get('/hello', (req, res) =>{
//      res.send("hello helo");
// })
// //get api call when like we dp /xyz 
// app.get('/', (req,res) =>{
//     res.send('Hello World');
// }); 
// app.use('/test', (req, res) =>{
//     res.send("hello helo");
// });
// //this will match all the api req to /test so we can get data in both get and post in using use but when we are usining the get and post it will react to the called one
// app.post( "/user", (req, res) => {
//     console.log("data base saved");
//     res.send("data sucessfully saved");
// });
// app.delete('/user', (req, res) => {
//     res.send("datat delted sucessfully");
// })
// app.get('/user', (req, res) =>{
//     console.log(req.query);
//     res.send({
//         name: "hi",
//         city:"jojo"
//     })
// });
// app.get('/user/:userid', (req, res) =>{
//     console.log(req.params);
//     res.send({
//         name: "hi",
//         city:"jojo"
//     })
// });
// app.get('/user/:userid/:name/:password', (req, res) =>{
//     console.log(req.params);
//     res.send({
//         name: "hi",
//         city:"jojo"
//     })
// });



// app.use('/user', 
//     (req, res, next) => {
//     //route handler () ={} 
//     next();
//     //res.send("r1");
//     console.log("middleware 1");
// },
// (req, res) =>{
//     res.send("r2");
//     console.log("middleware 2");
// }
// ); //output will be r2 and middleware 1 because we are using next() in the first middleware and then we are sending the response in the second middleware


// app.get( "/user",
//     (req, res, next) =>{
//     console.log("middleware 1");
//     next();
// },   
// );
// app.get("/user", (req, res,next) =>{
    
//     console.log("middleware 2");
//     res.send("sencond middleware");
// });



// app.use("/admin", (req, res, next) => {
//     const token = "xyz123";
//     if (token !== "xyz123") {
//        return res.status(401).send("unauthorized");

//     } else {
//         next();
//     }
// });

// app.get("/admin/data", (req, res) => {
//     res.send("all data is here");
// });


//diff between app = react and app = express is that react is used for frontend and express is used for backend
//what will happen if we use react instead of express is that we will not be able to create a server and handle the api calls and we will not be able to use the middleware and other features of express

//handle auth niddleware for all the get post all apis
//app.use("/admin"); //this will match all the api req to /admin and then we can check the token and then we can send the response accordingly

// const auth = require('./middlewares/auth');

// app.use("/admin", auth); //this will match all the api req to /admin and then we can check the token and then we can send the response accordingly
// app.get("/admin/data", (req, res) => {
//     res.send("all data is here");
// });


// app.get("/user", (req, res) =>{
//     throw new Error("ebde");
// }); 
// app.get("/user", (req, res) =>{
//     try{
//         throw new Error("hduid");
//     }
//     catch(err){
//         res.status(500).send("something went wrong");
//     }

// });


// app.use("/" , (err , req, res, next) => {
//     if(err){
//         res.status(500).send("something went wrong");
//     }
// });



// app.post("/signup", async (req, res) => {
//     const userobj = new User({
//         firstName :"prabh",
//         lastName : "singh",
//         email :"123@gmail.com",
//         password : "123",
//         age : 23,
//         gender :"male"
//     });
//     //creating qa new instance
//     try{
//         await userobj.save();
//     res.send("user created successfully");
//     }
//     catch(err){
//         res.status(500).send("something went wrong");
//      }
// });

//app.post("/signup", async (req, res) => {
//     const userobj = new User(req.body);

//     try{
//         await userobj.save();
//     res.send("user created successfully");
//     }
//     catch(err){
//         res.status(500).send("something went wrong");
//     }
// });

// //finf user by email
// app.get("/user", async (req,res) =>{
//     const emailid = req.body.email;  
//     try {
//     const user = await User.findOne({ email: emailid });
//     res.send(user);
//     console.log(user); 
//     } 
//     catch(err){
//         res.status(500).send("for user something went wrong");
//     }
// });


// app.get("/feed ", (req,res) =>{
//      try{
//         const user = User.find();
//         res.send(user);
//      }
//     catch(err){
//         res.status(500).send("for feed something went wrong");
//      }  
// });

// app.delete("/user", async (req, res) => {
//     const userid = req.body.userid;
//     try{
//         const user = await User.findByIdAndDelete(userid);
//         res.send("user deleted successfully");
//     }
//     catch(err){
//         res.status(500).send("for delete user something went wrong");
//     }
// });

//update user by id
// app.patch("/user", async (req, res) => {
//     const userid = req.body.userid;
//     const updateData = req.body;
//     try{
//         const user = await User.findByIdAndUpdate(userid, updateData, { new: true });
//         res.send(user);
//     }catch(err){
//         res.status(500).send("for update user something went wrong");
//     }
// });   




//learn validation 
// data sanitization and schema validation 

//update user by id
// going to use npm validator library for gmail validation and other validation


// app.patch("/user/:userid", async (req, res) => {
//     const userid = req.params?.userid;
//     const updateData = req.body;
    
//     try{    
//         const user = await User.findByIdAndUpdate(userid, updateData, { new: true, runValidators: true });
//         res.send(user); 
//         const allowed_updated = [ "age", "gender", "photourl", "about", "skills" ];
//         const isupadateallowed = Object.keys(updateData).every((key) => allowed_updated.includes(key));
//         if(!isupadateallowed){
//         //return res.status(400).send("invalid update");
//             throw new Error("invalid update");
//         }
//         if(updateData.skills.size > 10){
//             throw new Error ("skills can not more thann 10");
//         }
//         // if(updateData.email && !validator.isEmail(updateData.email)){
//         //     throw new Error("invalid email");
//         // }
//     }catch(err){
//         res.status(500).send("for update user something went wrong");
//     }
// }); 