'use strict';

/**
 * Created by Lazaro on 3/18/2017.
 */
var google = require('googleapis');
var gmail = google.gmail('v1');
var OAuth2 = google.auth.OAuth2;
var credentials = require('../../.credentials/google_credentials');

var oauth2Client = new OAuth2(credentials.client_id, credentials.client_secret, credentials.redirect_uri[1]);

module.exports = function (req, res) {

  var accessToken = req.body.headers.access_token;
  var userId = req.params.userId;
  var id = req.params.id;

  oauth2Client.setCredentials({
    access_token: accessToken
  });

  gmail.users.messages.modify({
    userId: userId,
    id: id,
    auth: oauth2Client,
    resource: {
      removeLabelIds: ["UNREAD"]
    }
  }, function (err, response) {
    if (err) {
      console.log(err);
      res.status(err.code).send({ errors: err.errors });
    } else {
      res.status(200).send(response.messages);
    }
  });
};
//# sourceMappingURL=modify-coupons.controller.js.map
