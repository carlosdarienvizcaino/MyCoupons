
var favoritesService = require('./favorites.service');

module.exports = function(req, res){

    var accessToken = req.headers.access_token;
    var userId = req.params.userId;

    favoritesService.getFavoriteCouponsIds(accessToken, userId)
      .then( email => {
        var responseBody = new ResponseBody(email.messages);
        res.status(200).send(responseBody);
      })
      .catch( error => {
        var failedResponseBody = new ResponseBody(undefined,error.message);
        res.status(400).send(failedResponseBody);
      });
};

function ResponseBody(ids, errorMessage) {
  this.ids = ids || [];
  this.errorMessage = errorMessage || '';
}




