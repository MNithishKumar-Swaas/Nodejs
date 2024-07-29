var express = require('express');
var mysql = require('mysql2');
var app = express();
app.use(express.json())

connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'swaas@123',
    database: 'k'
});

connection.connect(function(error){
    if(error){
        console.log('Error');
    }else {
        console.log('connected');
    }
});

app.get('/viewtask', function(req, res){
    connection.query("select * from  tasks", (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            console.log(rows);
            res.send(rows)
        } 
    })
})

app.post('/addtask', function(req, res){
    const x=req.body.description;
    connection.query("INSERT INTO tasks (description) VALUES (?)",[x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.post('/CompleteTask', function(req, res){
    const x=req.body.id;
    connection.query("UPDATE tasks SET completed = TRUE WHERE id = ?",[x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.patch('/UpdateTask', function(req, res){
    const d =req.body.description;
    const x =req.body.id;
    connection.query("UPDATE tasks SET description = ? WHERE id = ?",[d,x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.post('/addComment', function(req, res){
    const d =req.body.description;
    const x =req.body.id;
    connection.query("UPDATE tasks SET comment = ? WHERE id = ?",[d,x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.post('/deletetask', function(req, res){
    const x=req.body.description;
    connection.query("DELETE FROM tasks WHERE id = ?",[x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.listen(3001);
