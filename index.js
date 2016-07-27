var express = require('express');
var app = express();

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
		console.log('incremented - NEUTRALIZED');
		res.send(count + ': Action NEUTRALIZED'); // send text response
	} else {
		count++;
		console.log('incremented');
  		res.send(count + ': Count was incremented'); // send text response
	}
});

app.post('/minus', function(req, res) {
	res.statusCode = 200;
	res.type('text/plain'); // set content-type
	if(disabled){
		disabled = false;
		console.log('decremented - NEUTRALIZED');
		res.send(count + ': Action NEUTRALIZED'); // send text response
	} else {
		count--;
		console.log('decremented');
  		res.send(count + ': Count was decremented'); // send text response
	}
});

app.post('/neutral', function(req, res) {
	disabled = true;
	console.log('Next command will be neutralized');
	res.statusCode = 200;
	res.type('text/plain'); // set content-type
  	res.send(count + ': Next action will be neutralized'); // send text response
});

app.get('/', function(req, res) {
	res.statusCode = 200;
  	res.type('text/plain'); // set content-type
  	res.send(count+": Current count")
});

app.listen(port);

