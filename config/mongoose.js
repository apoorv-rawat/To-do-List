const mongoose = require('mongoose');

// set name here
mongoose.connect('mongodb://localhost/todo_list_db');

// acquire connection
const db = mongoose.connection;

// check for errors
db.on('error', console.error.bind(console, 'error connecting to db'));

// callback on successful connection
db.once('open', function () {
    console.log('Successfully connected to DB');
});