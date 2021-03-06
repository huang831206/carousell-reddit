var config = require('./ConfigLoader.js')

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

/*** hook services on express to provide to all requests ***/

// setup a ranker of top 20
var Ranker = require('./Ranker.js')
app.ranker = new Ranker('top20', 20)

// setup storage
var DB = require('./DB.js')
app.db = new DB().use('memory')

// setup the message queue for votes
var MQ = require('./MessageQueue.js')
app.mq = new MQ().use('rabbitmq')
// setup message queue onReceive handler
app.mq.onReceive(app.db, app.ranker)

/*******/

var routes = require('./routes/api.js')(app)

// turn on server
var http = require('http')


http.createServer(app).listen(config.port, function() {
    console.log('server listening on port ' + config.port + '...')
});
