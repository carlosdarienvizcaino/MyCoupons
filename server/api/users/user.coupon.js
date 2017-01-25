/**
 * Created by Carlos on 1/20/2017.
 */

var gmailClient = require("./gmail.client");
var gmail = gmailClient.gmail;
var oauth2Client  = gmailClient.oauth2Client;

module.exports = function(req, res){

    var accessToken = req.headers.access_token;
    var userId = req.params.userId;
    var emailId = req.params.emailId;

    oauth2Client.setCredentials({
      access_token: accessToken
    });

    gmail.users.messages.get({
      userId: userId,
      id : emailId,
      auth: oauth2Client,
    }, function (err, response) {

      if (err){
       console.log(err);
       res.status(err.code).send({errors: err.errors});
      }
      else {
        console.log(response);

        var reqRes = {
          data : response.payload
        };
        res.status(200).send(reqRes);
      }
    });
}
