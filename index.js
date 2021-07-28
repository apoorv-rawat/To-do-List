// import the express module
const express = require('express');
const port = 8000;

// create app (express application object) - our Express Server
const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware for our form
app.use(express.urlencoded());

// app.set('views', './views');

var todoList = [
    {
        desc : "Do Coding!!",
        category : "Personal",
        due_date : "15/5/2022"
    },
    {
        desc : "Exercise!!",
        category : "Personal",
        due_date : "15/8/2021"
    }
];

var isEmptyCheck = () => todoList.length == 0;
var isEmpty = isEmptyCheck();

app.get('/', function (req, res) {
    return res.render('home', {
        title : "Your Todo List",
        todo_list : todoList,
        is_empty : isEmpty
    });
});

// app.get('/delete-todo', function (req, res) {
// //    let id = req.query;
//     console.log(req.body);
//    console.log(id); 
// });

app.post('/delete-todo', function (req, res) {

    let data = req.body.desc;
    if(data === undefined) {
        console.log("Nothing selected");
    } else if(!Array.isArray(data) ) {
        // console.log("Not an array");
        let foundIndex = todoList.findIndex(todo => todo.desc == data);
        todoList.splice(foundIndex,1);
        
    } else {
        for (const d of data) {
            let foundIndex = todoList.findIndex(todo => todo.desc == d);
            todoList.splice(foundIndex,1);
        }
    }

    isEmpty = isEmptyCheck();
    
    return res.redirect('back');
});

app.post('/create-todo', function (req, res) {
    todoList.push(req.body);
    isEmpty = false;
    
    return res.redirect('back');
});

app.listen(port, function (err) {
    if(err) {
        console.log(`Error starting server ${err}`);
    }

    console.log(`Server started at port: ${port} `);
    
});