var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
// not used in initial commit but thinking about using it to identify users
// and track how much they've done each action
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure the port
var port = (process.env.PORT || 4730);
//The count. Ah ah ah ah....
var count = 0;
//For when users just want to spite everyone.
var disabled = false;

app.post('/plus', function(req, res) {
	res.statusCode = 200;
	res.type('text/plain'); // set content-type
	if(disabled){
		disabled = false;
		console.log('incremented - NEUTRALIZED')
		res.send(count + ': NEUTRALIZED'); // send text response
	} else {
		count++;
		console.log('incremented')
  		res.send(count + ': INCREMENTED'); // send text response
	}
});

app.post('/minus', function(req, res) {
	res.statusCode = 200;
	res.type('text/plain'); // set content-type
	if(disabled){
		disabled = false;
		console.log('decremented - NEUTRALIZED');
		res.send(count + ': NEUTRALIZED'); // send text response
	} else {
		count--;
		console.log('decremented')
  		res.send(count + ': DECREMENTED'); // send text response
	}
});

app.post('/neutral', function(req, res) {
	disabled = true;
	console.log('Next command will be neutralized');
	res.statusCode = 200;
	res.type('text/plain'); // set content-type
  	res.send(count + ': SABOTAGED'); // send text response
});

app.get('/', function(req, res) {
	res.statusCode = 200;
  	res.type('text/plain'); // set content-type
  	res.send(count+": Current count")
});

app.listen(port);

