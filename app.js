const http = require('http');
const hostname = 'localhost';
const port = 8081;
const express = require('express');
const app = express();
const path = require("path");

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
    /*
    <!--
    user_id	mediumint(9)
    username	varchar(255)
    password	varchar(256)
    email	varchar(256)
    dateOfBirth	date
    user_role	enum('USER','ADMIN','MOD')
    -->
    */
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
    res.end();
});

app.listen(8080);

server.listen(hostname, () => {
  var currentDate = new Date();
  console.log(currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds());
  console.log('Server is running at ' + hostname + ':' + port);
})
