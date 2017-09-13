var express = require("express");
var app     = express();
//var router = express.Router();
var path    = require("path");
var routes = require('express-routes');
var AM = require('../modules/account-manager');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var session		=	require('express-session');
var MemoryStore = require('memorystore')(session);

const fs = require('fs');


/* app.use(session({secret: 'ssshhhhhkkk',saveUninitialized: true, store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h 
    }), resave: true})); */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));
app.use(routes);	
var sess;

module.exports = function(app) {
//
		
		app.post('/Login', function(req, res){
		//var form = document.querySelector('#signupForm');
		//var data = getFormData(form);
		//Comment		
		//req.session.save();
		//console.log(req.session+'sESSION');
		//sess = req.session;
		//In this we are assigning email to sess.email variable.
		//email comes from HTML page.
		//sess.username=req.body.lg_username;
		AM.loginAccount({
			u_name 	: req.body.lg_username,
			u_pwd 	: req.body.lg_password
		}, function(e){
			if (e==="invalid"){
				//res.status(400).send(e);
				res.status(200).send('invalid');
			}	
			else{
				//console.log(e);
				var file =  "./public/js/data.json";
				var file1 =  "./public/js/user.json";
						console.log(file);
						var text = JSON.stringify(e);
						var text1 = JSON.stringify(req.body.lg_username);
						text = "var jsonObject = {\"start\": {\"data\": " + text +"}}";
						text1 = "var jsonUserObject = {\"start\": {\"data\": [{\"u_name\": " + text1 +"}]}}";
						fs.writeFileSync(file, text);
						fs.writeFileSync(file1, text1);
				//res.status(200).send('ok');
				res.sendFile(path.join(__dirname +'/views/ChatRoom.html'));
				//res.render('ViewMode', {data: req.body.lg_username});
			}
		});
	});
	
// creating new accounts //
		app.post('/Register', function(req, res){
		//var form = document.querySelector('#signupForm');
		//var data = getFormData(form);
		//console.log(req.body.username);
		
		AM.addNewAccount({
			u_name 	: req.body.username,
			u_id 	: req.body.andrewid,
			u_pwd 	: req.body.password
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('Account added Successfully');
			}
		});
	});
	
// Post Message
app.post('/ChatRoom', function(req, res){
				AM.postMessage({
					u_name 	: req.body.username,
					u_msg 	: req.body.usermsg
				}, function(e){
					/* if (e){
						res.status(400).send(e);
					}else{ */
						//res.status(200).send(e);
					//	res.render(e);
					//var jsonObject = {
					//		"start": {
					//			"data":
						var file =  "./public/js/data.json";
						console.log(req.body.username);
						var text = JSON.stringify(e);
						text = "var jsonObject = {\"start\": {\"data\": " + text +"}}";
						fs.writeFileSync(file, text);
						res.sendFile(path.join(__dirname +'/views/ChatRoom.html'));						
					//}
				});
		});

};
