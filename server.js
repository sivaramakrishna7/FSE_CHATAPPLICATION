var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser  = require('body-parser');
var http = require('http');
var server = http.createServer(app);
//var bodyParser = require('body-parser');
var AM = require('./modules/account-manager');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname +'/server/views/Index.html'));
});

app.get('/Register',function(req,res){
  res.sendFile(path.join(__dirname +'/server/views/Register.html'));
});


app.get('/Reset',function(req,res){
  res.sendFile(path.join(__dirname +'/server/views/Reset.html'));
});
require('./server/routes')(app);
app.listen(3000);

console.log("Running at Port 3000");