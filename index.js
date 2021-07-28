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

// app.set('views', './views');

// var todoList = [
//     {
//         desc : "Do Coding!!",
//         category : "Personal",
//         due_date : "2022-11-22"
//     },
//     {
//         desc : "Exercise!!",
//         category : "Personal",
//         due_date : "2021-05-01"
//     }
// ];

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
isEmptyCheck();


app.get('/', function (req, res) {

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

    // if(data === undefined) {
    //     console.log("Nothing selected");
    // } else if(!Array.isArray(data) ) {
    //     let foundIndex = todoList.findIndex(todo => todo.desc == data);
    //     todoList.splice(foundIndex,1);
        
    // } else {
    //     for (const d of data) {
    //         let foundIndex = todoList.findIndex(todo => todo.desc == d);
    //         todoList.splice(foundIndex,1);
    //     }
    // }
});

app.post('/create-todo', function (req, res) {

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