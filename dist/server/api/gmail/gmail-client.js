'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.GET_Message = GET_Message;
exports.LIST_Messages = LIST_Messages;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Carlos on 2/28/2017.
 */

var google = require('googleapis');
var gmail = google.gmail('v1');
var OAuth2 = google.auth.OAuth2;
var credentials = require('../../.credentials/google_credentials');

var oauth2Client = new OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uri[1]);

function GET_Message(options, accessToken) {

  oauth2Client.setCredentials({
    access_token: accessToken
  });

  options.auth = oauth2Client;

  return new _promise2.default(function (resolve, reject) {
    gmail.users.messages.get(options, function (err, email) {
      if (err) reject(err);else resolve(email);
    });
  });
}

function LIST_Messages(options, accessToken) {

  oauth2Client.setCredentials({
    access_token: accessToken
  });

  options.auth = oauth2Client;

  return new _promise2.default(function (resolve, reject) {
    gmail.users.messages.list(options, function (err, email) {
      if (err) reject(err);else resolve(email);
    });
  });
}
//# sourceMappingURL=gmail-client.js.map
