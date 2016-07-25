// declare globals
var HTTP = require('http');
var HTTPS = require('https');
var fs = require('fs');
var Express = require('express');

var app = Express();
if (process.env.PORT === 80) {
    //used HTTPS redirect
    var appHTTP = Express();
}

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

if(process.env.PORT === 80) {
    //HTTPS redirect
    // force redirect to https, running on deployed server
    appHTTP.use(function ( req, res, next ) {
        res.set('X-Forwarded-Proto','https');
        res.redirect('https://'+ req.headers.host + req.url);
        next();
    });
    
}

// mount the api routes
app.use('/api/v0', apiRoutes);

//set up default for unrecognized routes
app.use( function(req, res) {
    res.status(404).send("unknown request");
});

if(process.env.PORT === 80) {
    HTTP.createServer( appHTTP ).listen( process.env.PORT || 80 );
    
    // HTTPS Setup //
    try {
    
        var credentials = {
          key: fs.readFileSync('/etc/letsencrypt/live/www.myfotowarsapp.xyz/privkey.pem'),
          cert: fs.readFileSync('/etc/letsencrypt/live/www.myfotowarsapp.xyz/cert.pem')
        };
        
        HTTPS.createServer(credentials, app).listen( process.env.PORT_SSL || 443);
    }
    catch(error){
        console.log('HTTPS setup failed.');
        console.log('=-=-=-=-=-=-=-=-=-=-=');
        console.log(error);
    
    }
} else {
    //running on cloud9/development system, just setup http
    // set up listen port for connections
    app.listen(port, function (err) {
    if ( !err ) console.log('Server is listening on port: ' + port);
    if ( err )  console.error('Server Crashed!');
    });
}