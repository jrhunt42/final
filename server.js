//DECLARE GLOBAL VARIABLES
var Express = require('express');
var app = Express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
//var apiRoutes = require('./api_routes'); //brings in module.exports = apiRouter
var port = process.env.PORT || 8999;


//APPLY MIDDLEWARE
app.use(logger('dev'));//LOG ALL IN-COMING ROUTES
app.use(bodyParser.json());//PARSE ALL FORM DATA TO JSON
app.use(bodyParser.urlencoded({extended: true}));//ALLOW URL-ENCODED TO BE PARSED
app.use(Express.static(path.join(__dirname, './public')));//SERVE YOUR PUBLIC FILES FOR THE FRONTEND

//MOUNT THE API ROUTES
//app.use('/api/v1', apiRoutes);

//LISTEN ON A SPECIFIC PORT CHECK FOR ERROR
app.listen(port, function (err) {
  if ( !err ) console.log('Server is listening on port: ' + port);
  if ( err )  console.log('Server Crashed!');
})