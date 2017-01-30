/**
 * Created by Carlos on 1/20/2017.
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

    var accessToken = req.headers.access_token;
    var userId = req.params.userId;
    var maxResults = req.params.maxResults || 1;

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    gmail.users.messages.list({
      labelIds : "CATEGORY_PROMOTIONS",
      userId: userId,
      auth: oauth2Client,
      maxResults : maxResults
    }, function (err, response) {

      if (err){
       console.log(err);
       res.status(err.code).send({errors: err.errors});
      }
      else {
        res.status(200).send(response.messages);
      }
    });
}
