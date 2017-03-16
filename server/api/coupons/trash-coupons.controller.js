/**
 * Created by Lazaro on 3/15/2017.
 */

var google = require('googleapis');
var gmail = google.gmail('v1');
var OAuth2 = google.auth.OAuth2;
const credentials = require('../../.credentials/google_credentials');

var oauth2Client = new OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uri[1]
);

module.exports = function(req, res){

  var accessToken = req.body.headers.access_token;
  var userId = req.params.userId;
  var id = req.params.id;

  oauth2Client.setCredentials({
    access_token: accessToken
  });

  gmail.users.messages.trash({
    userId: userId,
    id : id,
    auth: oauth2Client,
  }, function (err, response) {
    if(err){
      console.log(err);
      res.status(err.code).send({errors: err.errors});
    }
    else {
      res.status(200).send(response.messages);
    }
  });
};
