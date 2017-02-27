/**
 * Created by Carlos on 2/28/2017.
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

export function GET_Message(options, accessToken) {

  oauth2Client.setCredentials({
      access_token: accessToken
  });

  options.auth = oauth2Client;

  return new Promise(function (resolve, reject){
    gmail.users.messages.get(options, function(err, email) {
      if (err)
        reject(err);
      else
        resolve(email);
    });
  });
}

export function LIST_Messages(options, accessToken) {

  oauth2Client.setCredentials({
      access_token: accessToken
  });

  options.auth = oauth2Client;

  return new Promise(function (resolve, reject){
    gmail.users.messages.list(options, function(err, email) {
      if (err)
        reject(err);
      else
        resolve(email);
    });
  });
}

