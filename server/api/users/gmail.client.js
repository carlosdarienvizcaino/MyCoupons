/**
 * Created by Carlos on 1/24/2017.
 */

var google = require('googleapis');
var gmail = google.gmail('v1');
var OAuth2 = google.auth.OAuth2;

var YOUR_CLIENT_ID = '1067900185599-f5h58q36rfs9e8bg750gt25n8nmaupaq.apps.googleusercontent.com';
var YOUR_CLIENT_SECRET = 'JDix3LhUyNEMSF18NwCVyX3s';
var YOUR_REDIRECT_URL = "http:localhost:3000";

var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

module.exports = {
  gmail : gmail,
  oauth2Client : oauth2Client
};

