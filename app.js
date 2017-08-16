
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars  = require('express-handlebars'), hbs;
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded( { extended: true } ));
var mongoose = require("mongoose");
var UsersSchema  = new mongoose.Schema({ "email": String, "password": String });
var Users = mongoose.model("users", UsersSchema);
var port= process.env.PORT || 8080;
app.set('views', path.join(__dirname, 'views'));

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'static')));

// send app to router
require('./router')(app);
app.post("/userlogin", fun2);
function fun2(request, response)
{
	mongoose.connect("mongodb://localhost/nodedb");
	Users.find( { "email": request.body.username, "password": request.body.password }, fun3 );
	function fun3(error, data)
	{
		if (error == null)
		{
			if (data.length >= 1)
			{
				response.send("<h1>Successful Login</h1>");
				mongoose.connection.close();
			}
			else
			{
				response.send("<h1>Invalid Login</h1>");
				mongoose.connection.close();
			}
		}
		else
		{
			response.send("<h1>Database error</h1>");
			mongoose.connection.close();
		}
	}
}
/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/
app.listen(port,function(){
    console.log("server started at" + port);
});


