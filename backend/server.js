var config = {
    port: 3000
}

var cors = require('cors')
var express = require('express')
var app = express()

// express configuration
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,POST',
    'preflightContinue': false
}));
app.use(express.json())


var routes = require('./routes/api.js')(app)

// turn on server
var http = require('http')


http.createServer(app).listen(config.port, function() {
    console.log('server listening on port ' + config.port + '...')
});
