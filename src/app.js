const http = require('http');

const express = require('express');


const app = express();

app.use("/" ,(req,res) => {
    res.send('Hello World');  
});

app.use("/hello" , (req , res) => {
    res.send("hello url")
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
  