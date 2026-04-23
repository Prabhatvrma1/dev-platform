const express = require('express');
const http = require('http');

const app = express();
//diff between app = react and app = express is that react is used for frontend and express is used for backend
//what will happen if we use react instead of express is that we will not be able to create a server and handle the api calls and we will not be able to use the middleware and other features of express

app.use('/user', (req, res, next) => {
    //route handler () ={} 
    next();
    //res.send("r1");
    console.log("middleware 1");
},
(req, res) =>{
    res.send("r2");
}
); //output will be r2 and middleware 1 because we are using next() in the first middleware and then we are sending the response in the second middleware




app.listen(3000, ( req, res) =>{
    console.log('Server is running on port 3000');
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