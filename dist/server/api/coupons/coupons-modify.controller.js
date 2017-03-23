'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var google = require('googleapis');
var gmail = google.gmail('v1');
var OAuth2 = google.auth.OAuth2;
var credentials = require('../../.credentials/google_credentials');
var MYCOUPONS_READ = 'MYCOUPONS_READ';

var oauth2Client = new OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uri[1]);

module.exports = function (req, res) {

  var accessToken = req.headers.access_token;
  var userId = req.params.userId;
  var body = req.body;

  oauth2Client.setCredentials({
    access_token: accessToken
  });

  res.status(204);
  // modifyEmailsLabelsIds(body, userId, oauth2Client)
  //   .then( email => {
  //     res.status(200).send("OK");
  //   })
  //   .catch(error => {
  //     res.status(400).send({errorMessage : error.message});
  //   });
};

function modifyEmailsLabelsIds(userId, body, oauth2Client) {
  var options = {
    userId: userId,
    body: body,
    auth: oauth2Client
  };
  return new _promise2.default(function (resolve, reject) {
    gmail.users.messages.batchModify(options, function (err, email) {
      if (err) reject(err);else resolve(email);
    });
  });
}
//# sourceMappingURL=coupons-modify.controller.js.map
