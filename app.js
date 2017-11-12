const http = require('http');
const express = require('express');
const path = require("path");
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "roar"
});

const hostname = 'localhost';
const port = 8081;

const server = http.createServer((request, response) => {
  const {headers, methods, url} = request;
  if(request.url == '/index'){
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname+"/index.html"));
    })
  }
  if(request.url === '/sign-up'){
    app.get('/sign-up', (req,res) => {
      var username = req.param('username');
      var password = req.param('password');
      var email = req.param('email');
      response.write(username + " " + password + " " + email);
    });

  }
  else{
    response.status = 404;
    response.write("OH NO I AM BROKE!!! :'('");
  }
  response.end();
}).listen(port);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/sign-up', (req, res) => {
    var username = req.param('username');
    var password = req.param('password');
    var email = req.param('email');
    res.write(username + " " + password + " " + email);
    connection.query("INSERT INTO user (username, password, email, user_role) VALUES (\"" + username + "\", \"" + password + "\", \"" + email + "\", " + "\"USER\");");
    /*INSERT INTO user (username, password, email, user_role) VALUES ("Adzwoolly", "Password", "adz@gmail.co.uk", "USER");*/
    res.end();
});

app.listen(8080);

server.listen(hostname, () => {
  var currentDate = new Date();
  console.log(currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds());
  console.log('Server is running at ' + hostname + ':' + port);
})
