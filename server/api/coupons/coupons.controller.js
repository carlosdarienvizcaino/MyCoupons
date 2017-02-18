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
    var id = req.params.id;

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    gmail.users.messages.get({
      userId: userId,
      id : id,
      auth: oauth2Client,
    }, function (err, email) {

      if (err){

       var responseBody  = createResponseBodyForFailedRequest(id, err);
       res.status(err.code).send(responseBody);

      }
      else {

        var payload = email.payload;
        if ( isMimeTypeHtml(payload.mimeType) ) {

          var responseBody  = createResponseBodyFromSinglePartEmail(email);
          res.status(200).send(responseBody);

        }
        else if ( isMimeTypeMultipart(payload.mimeType) ) {

          var responseBody = createResponseBodyFromMultiPartEmail(email);
          res.status(200).send(responseBody);

        }
        else {

          var responseBody = createResponseBodyForUnknownMimeTypeEmail(email);
          res.status(400).send(responseBody);
        }

      }
    });
};

function ResponseBody(id, data, errorMessage) {
  this.id = id || 'UNKNOWN';
  this.data = data || [];
  this.errorMessage = errorMessage || 'UNKNOWN';
}

function createResponseBodyFromSinglePartEmail(email) {
  var id = email.id;
  var data = [ email.payload.body.data ];
  return new ResponseBody(id,data);
}

function createResponseBodyFromMultiPartEmail(email) {

  var id = email.id;
  var payloadParts = email.payload.parts;
  var data = [];

  payloadParts.forEach( part =>{
    if ( isMimeTypeHtml(part.mimeType) ){
      data.push(part.body.data);
    }
  });
  return new ResponseBody(id,data);
}

function createResponseBodyForUnknownMimeTypeEmail(email) {
  var id = email.id;
  var data = undefined;
  var errorMessage = `Gmail Coupon with id: ${email.id} MimeType: ${email.payload.mimeType} is invalid`;
  return new ResponseBody(id, data, errorMessage);
}

function createResponseBodyForFailedRequest(id, error) {
  var errorMessage = error.errors[0].message;
  return new ResponseBody(id, undefined, errorMessage);
}

function isMimeTypeHtml(mimeType) {
  return mimeType === 'text/html';
}

function isMimeTypeMultipart(mimeType) {
 return mimeType === 'multipart/alternative';
}
