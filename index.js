// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// timestamp API
app.get("/api/:date", function (req, res) {
  // convert input to date
  const user_input = new Date(Number(req.params.date) ? Number(req.params.date) : req.params.date)
  if (user_input.toString() === "Invalid Date") {
    res.json({error: user_input.toString()})
  } else {
    res.json({unix: user_input.getTime(), utc: user_input.toUTCString()})
  }
});

app.get("/api", function(req, res) {
  const today = new Date()
  res.json({unix: today.getTime(), utc: today.toUTCString()})
});

app.use(express.static(__dirname + '/api'))



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
