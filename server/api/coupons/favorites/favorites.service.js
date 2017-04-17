

var gmail = require('../../gmail/gmail-client');

module.exports = new FavoritesService();

function FavoritesService () {
}

/**
 *  @param (String) access token
 *  @param {String} userId
 *  @return {Promise} messages[{id:string},...,{id:string]
 */

FavoritesService.prototype.getFavoriteCouponsIds = function (accessToken, userId) {
  var options = {
      userId : userId,
      labelIds: ['CATEGORY_PROMOTIONS', 'STARRED'],
      fields: 'messages(id)'
    };
  return gmail.LIST_Messages(options, accessToken);
};



