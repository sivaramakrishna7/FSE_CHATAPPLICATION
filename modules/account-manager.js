var mysql = require('mysql');
var express = require("express");
var app     = express();
var moment = require('moment');
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ 
   extended: true 
}));
var con = mysql.createConnection({
  connectionLimit : 10,
  host: "localhost",
  user: "root",
  password: "Sarovaram",
  database: "fse"
});
//var uname;
con.connect(function(err) {
	  if (err) throw err;
	  });
// con.connect(function(err) {
  // if (err) throw err;
  // con.query("SELECT * FROM accounts", function (err, result) {
    // if (err) throw err;
    // console.log(result);
	 // var string=JSON.stringify(result);
        // console.log('>> string: ', string );
        // var json =  JSON.parse(string);
        // console.log('>> json: ', json);
  // });
// });
//where u_id="+aid+" or u_name="+uname+"
exports.addNewAccount = function(newData, callback)
{
	var uname= newData.u_name;
	var aid = newData.u_id;
	var pwd = newData.u_pwd;
	con.query("SELECT * FROM accounts where u_id=? or u_name=? ", [aid, uname],
	  function (err, result) {
		if (err){
			throw err;
		} else{
					con.query("Insert into accounts (u_id, u_name, u_pwd) values(?,?,?)", [aid, uname, pwd],
					function (err, result) {
					console.log(result +'  From Sign UP');
					if (err) callback(err)
					else callback(null, result)
					});		
		}
	  });
	
}
exports.loginAccount = function(newData, callback)
{
	var uname= newData.u_name;
	var pwd = newData.u_pwd;
	  con.query("SELECT * FROM accounts where u_name=? and u_pwd=? ", [uname, pwd],
	  function (err, result) {
		if (typeof  result[0] === 'undefined' || result[0] === null){
			callback("invalid", result)
		} else{
					/* console.log(result[0].u_id);
					if((result[0].u_id).length===0){
						
					}
					else{} */
					con.query("SELECT * FROM messages" , function(err, res){
							callback(res)
							});	
						//console.log(result);
						//callback("valid_LOGIN", result)
					
					
					
						
		}
	});
}
exports.postMessage = function(newData, callback)
{
	var uname= newData.u_name;
	var msg = newData.u_msg;
	var dt = moment().format('MMMM Do YYYY, h:mm:ss a');
	console.log(uname, msg, dt);
	con.query("SELECT * FROM accounts where u_id is not null", function(err, res){
	console.log(res);
	if (err){
			throw err;
		} else{
	con.query("Insert into messages (u_name, u_msg, u_msg_dt) values(?,?,?)", [uname, msg, dt],
					function (err, result) {
					console.log(result + '  From Post');
					if (err) callback(err)
					else
						{
							con.query("SELECT * FROM messages" , function(err, res){
							callback(res)
							});				
						}
					});	
			}
			});
}
