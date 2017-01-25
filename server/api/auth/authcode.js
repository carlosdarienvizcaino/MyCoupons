
var google = require('googleapis');
var googleOAuth2 = google.auth.OAuth2;
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;

// Note: any redirect uri used must be listed on the Google Console Credentials
const credentials = {
  client_secret :"JDix3LhUyNEMSF18NwCVyX3s",
  client_id: "1067900185599-f5h58q36rfs9e8bg750gt25n8nmaupaq.apps.googleusercontent.com",
  redirect_uris:["urn:ietf:wg:oauth:2.0:oob","http://localhost:3002"]
}

var oauth2Client = new googleOAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[1]
);
var client = new auth.OAuth2(credentials.client_id, '', '');

module.exports = function(req, res){

  console.log(req.body);
  var authorizationCode = req.body.authCode;
  console.log(authCode);
  oauth2Client.getToken(authorizationCode, function (err, tokens) {

    if (err){
      console.log("ERROR: Getting access token with authorizationCode: " + authorizationCode);
      console.log(err);
      res.status(err.code).send(err);
    }
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    else {
      console.log(tokens);
      oauth2Client.setCredentials(tokens);
      var idToken = tokens.id_token;

      client.verifyIdToken(idToken,credentials.client_id , function(err, login) {
        if (err){
          /*TODO @carlosv: what should be done when authentication fails*/
          res.status(403).send("TOKEN AUTHENTICATION ERROR:" + err);
        }
        else {
          /*TODO @carlosv check aud to match one of the app's client id*/
          var payload = login.getPayload();
          console.log(payload);
          res.status(200).send(payload['sub']);
        }
      });
    }
  });
}



