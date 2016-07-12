var apiRouter = require('express').Router();

var fotoCtrl = require('./controllers/fotoController');
var userCtrl = require('./controllers/userController');

// need to support multipart form data (files and data)
// in this app the files will be images
var multiparty = require('connect-multiparty');

//////////////////////////////////////// foto routes //////////////////////////
// http://localhost/api/v0/fotos
apiRouter.route('/fotos')
    .get(fotoCtrl.get);
    
// add in multiparty middleware just for this route
apiRouter.post('/fotos', multiparty(), fotoCtrl.create);


// http://localhost/api/v0/fotos/:id
apiRouter.route('/fotos/:id')
    .get(fotoCtrl.get)
    .put(fotoCtrl.update)
    .delete(fotoCtrl.delete);

/////////////////////////////////////// user routes ///////////////////////////
apiRouter.route('/users')
    .get(userCtrl.get)
    .post(userCtrl.create);
    
apiRouter.route('/users/:id')
    .get(userCtrl.get)
    .put(userCtrl.update)
    .delete(userCtrl.delete);
    
module.exports = apiRouter;