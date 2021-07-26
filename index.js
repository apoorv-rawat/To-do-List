// import the express module
const express = require('express');
const port = 8000;

// create app (express application object) - our Express Server
const app = express();

app.get('/', function (req, res) {
    return res.end("<h1>Hello</h1>");
});

app.listen(port, function (err) {
    if(err) {
        console.log(`Error starting server ${err}`);
    }

    console.log(`Server started at port: ${port} `);
    
});