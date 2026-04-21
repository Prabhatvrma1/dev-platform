const react = require('express');
const http = require('http');

const app = react();


// if you use app.use / user here igt will then just use this one and all the api  will get uselesss


app.get('/user', (req, res) =>{
    res.send({
        name: "hi",
        city:"jojo"
    })
});

app.post( "/user", (req, res) => {
    console.log("data base saved");
    res.send("data sucessfully saved");

});

app.delete('/user', (req, res) => {
    res.send("datat delted sucessfully");
})


app.listen(3000, ( req, res) =>{
    console.log('Server is running on port 3000');
});






// //https methods - post , get ,patch , delete

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
