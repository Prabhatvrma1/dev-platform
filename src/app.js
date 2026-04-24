const express = require('express');
const http = require('http');
const connectdb = require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    const userobj = new User({
        firstName :"prabh",
        lastName : "singh",
        email :"123@gmail.com",
        password : "123",
        age : 23,
        gender :"male"
    });
    //creating qa new instance
    try{
        await userobj.save();
    res.send("user created successfully");
    }
    catch(err){
        res.status(500).send("something went wrong");
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

