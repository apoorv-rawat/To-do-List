// import the express module
const express = require('express');
const port = 8000;

// get mongoose module
const db = require('./config/mongoose');

// get todo list schema
const Todoitem = require('./models/todolist');

// create app (express application object) - our Express Server
const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware for our form
app.use(express.urlencoded());

// middleware for serving statics
app.use(express.static('assets'));

// get number of documents in DB
function isEmptyCheck() {
    Todoitem.countDocuments({}, function (err, count) {
        if(count == 0) {
            isEmpty = true;
        } else {
            isEmpty = false;
        }
    });
    // var isEmptyCheck = () => todoList.length == 0;
} 
var isEmpty;


// routes

app.get('/', function (req, res) {

    isEmptyCheck();

    // using mongoose - get all documents
    Todoitem.find({}, function (err, todo) {
        if(err) {
            console.log('Error in fetching records');
            return;
        }

        return res.render('home', {
            title : "Your Todo List",
            todo_list : todo,
            is_empty : isEmpty
        });

    });

});

app.post('/delete-todo', function (req, res) {

    let data = req.body._id;

    function deleteFromDBHelper(id) {

        Todoitem.findByIdAndDelete(id, function (err) {
            if(err) {
                console.log('Error in deleting document from DB');
                return false;
            }
        }); 
        return true;
    }

    if(data === undefined) {
        console.log("Nothing selected");
    } else if(!Array.isArray(data) ) {
        
        if(!deleteFromDBHelper(data)) {
            console.log('error occured');
            return;
        }
        
    } else {
        for (const d of data) {
            if(!deleteFromDBHelper(data)) {
                console.log('error occured');
                return;
            }
        }
    }
    
    isEmptyCheck();
    
    return res.redirect('back');
});

app.post('/create-todo', function (req, res) {

    // console.log(req.body);
    Todoitem.create(
        req.body
    );

    isEmpty = false;
    
    return res.redirect('back');
});

app.listen(port, function (err) {
    if(err) {
        console.log(`Error starting server ${err}`);
    }

    console.log(`Server started at port: ${port} `);
    
});