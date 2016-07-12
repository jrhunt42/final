// declare globals
var Express = require('express');
var app = Express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var apiRoutes = require('./api_routes');
var port = process.env.PORT || 8999;

// connect to database
mongoose.connect('mongodb://localhost/fotowars',
    function( error ){
        if( error ) {
            console.error('ERROR starting mongoose!', error);
        } else {
            console.log('Mongoose connected successfully');
        }
    });

// apply middleware
app.use(Express.static(path.join(__dirname, './public'))); // serve public files to front end
app.use(logger('dev')); // log all incoming routes
app.use(bodyParser.json()); // parse all json form data
app.use(bodyParser.urlencoded({extended: true})); // parse urlencoded form data


// mount the api routes
app.use('/api/v0', apiRoutes);

//set up default for unrecognized routes
app.use( function(req, res) {
    res.status(404).send("unknown request");
})

// set up listen port for connections
app.listen(port, function (err) {
  if ( !err ) console.log('Server is listening on port: ' + port);
  if ( err )  console.error('Server Crashed!');
})