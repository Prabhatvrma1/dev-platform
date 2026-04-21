const react = require('express');
const http = require('http');

const app = react();

app.get('/', (req,res) =>{
    res.send('Hello World');
}); 

app.get('/hello', (req, res) =>{
     res.send("hello helo");
})

app.listen(3000, ( req, res) =>{
    console.log('Server is running on port 3000');
});