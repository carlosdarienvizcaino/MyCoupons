/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.post('/api/auth/authcode/', require('./api/auth/authcode.controller'));

  app.get('/api/users/:userId/coupons/ids', require('./api/coupons/coupons.id.controller'));
  app.get('/api/users/:userId/coupons/ids/:maxResults/:company', require('./api/coupons/coupons.id.controller'));
  app.get('/api/users/:userId/coupons/company/:id', require('./api/coupons/coupons.companyname.controller'));
  app.get('/api/users/:userId/coupons/ids/:maxResults', require('./api/coupons/coupons.id.controller'));
  app.get('/api/users/:userId/coupons/:id', require('./api/coupons/coupons.controller'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
