'use strict';

var google = require('googleapis');
var googleOAuth2 = google.auth.OAuth2;

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();

var credentials = require('../../.credentials/google_credentials');

var oauth2Client = new googleOAuth2(credentials.client_id, credentials.client_secret,
// 'postmessage' for redirect_uri
credentials.redirect_uri[0]);
var client = new auth.OAuth2(credentials.client_id, '', '');

module.exports = function (req, res) {

  var authorizationCode = req.body.authCode;

  oauth2Client.getToken(authorizationCode, function (err, tokens) {

    if (err) {
      console.log("ERROR: Getting access token with authorizationCode: " + authorizationCode);
      console.log(err);
      res.status(err.code).send(err);
    }
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    else {
        oauth2Client.setCredentials(tokens);
        var idToken = tokens.id_token;

        client.verifyIdToken(idToken, credentials.client_id, function (err, login) {
          if (err) {
            /*TODO @carlosv: what should be done when authentication fails*/
            res.status(403).send("TOKEN AUTHENTICATION ERROR:" + err);
          } else {
            /*TODO @carlosv check aud to match one of the app's client id*/
            var payload = login.getPayload();
            var resBody = {
              sub: payload['sub'],
              access_token: tokens['access_token']
            };
            res.status(200).send(resBody);
          }
        });
      }
  });
};
//# sourceMappingURL=authcode.controller.js.map
