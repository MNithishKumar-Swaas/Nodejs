var express = require('express');
var mysql = require('mysql2');
var app = express();
const dotenv =require("dotenv");
const jwt=require('jsonwebtoken')
dotenv.config();
app.use(express.json())

const posts = {
    username: "nithishkumarnk",
    password: "nanna@143"
  };
   
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === posts.username && password === posts.password) {
      const token = jwt.sign({ user: username }, process.env.Access_token_nk, {
        expiresIn: '1d',
      });
      res.json({ token: token });
    }
  });

  function verifyToken(req, res, next) {
      const token = req.headers['authorization'];
     
     
      if (!token) {
        return res.status(403).send("Token is required");
      }
      jwt.verify(token,process.env.Access_token_nk, (err, user) => {
        if (err) {
          return res.status(401).send("Invalid Token");
        }
        req.user = user;
        next();
      });
    }
   
connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'k'
});

connection.connect(function(error){
    if(error){
        console.log('Error');
    }else {
        console.log('connected');
    }
});

app.get('/viewtask', verifyToken,function(req, res){
    connection.query("select * from  tasks", (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            console.log(rows);
            res.send(rows)
        } 
    })
})

app.post('/addtask', verifyToken,  function(req, res){
    const x=req.body.description;
    connection.query("INSERT INTO tasks (description) VALUES (?)",[x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.post('/CompleteTask',verifyToken, function(req, res){
    const x=req.body.id;
    connection.query("UPDATE tasks SET completed = TRUE WHERE id = ?",[x], (error, rows, fields) => {
        if(error){
            console.log('Error in query');
        }else {
            res.send("Success")
        } 
    })
})

app.patch('/UpdateTask', verifyToken, function(req, res){
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

app.post('/addComment', verifyToken,function(req, res){
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

app.post('/deletetask', verifyToken,function(req, res){
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
