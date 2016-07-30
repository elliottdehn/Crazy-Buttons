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

var actions = ['incremented','decremented','neutralized']
var attributes = ['count'.'actionPerformed']

app.post('/plus', function(req, res) {
	res.statusCode = 200;
	res.type('application/json'); // set content-type
	if(disabled){
		disabled = false;
		console.log('incremented - NEUTRALIZED')
		res.json({ currentCount: ''+count, actionPerformed: actions[0], success: 'false' });  
	} else {
		count++;
		console.log('incremented')
		res.json({ currentCount: ''+count, actionPerformed: actions[0], success: 'false' }); 
	}
});

app.post('/minus', function(req, res) {
	res.statusCode = 200;
	res.type('application/json'); // set content-type
	if(disabled){
		disabled = false;
		console.log('decremented - NEUTRALIZED');
		res.json({ currentCount: ''+count, actionPerformed: actions[2], success: 'false' });  
	} else {
		count--;
		console.log('decremented')
		res.json({ currentCount: ''+count, actionPerformed: actions[2], success: 'true' });  
	}
});

app.post('/neutral', function(req, res) {
	disabled = true;
	console.log('Next command will be neutralized');
	res.statusCode = 200;
	res.type('application/json'); // set content-type
  	res.json({ currentCount: ''+count, actionPerformed: actions[1], success: 'true' });  
});

app.get('/', function(req, res) {
	res.statusCode = 200;
	res.type('application/json'); // set content-type
  	res.json({ currentCount: ''+count});  
});

app.listen(port);

