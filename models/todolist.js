const mongoose = require('mongoose');

// create schema for DB
const todoSchema = new mongoose.Schema({
    desc : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    due_date : {
        type : Date,
        required : true
    }
});

// create a model - (a class for generating documents or objects)
const Todoitem = mongoose.model('Todoitem', todoSchema);

module.exports = Todoitem;