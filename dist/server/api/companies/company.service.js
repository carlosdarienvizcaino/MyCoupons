'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Carlos on 3/2/2017.
 */

var gmail = require('../gmail/gmail-client');

module.exports = CompanyService;

function CompanyService() {}

CompanyService.prototype.getCouponsPerCompany = function (accessToken, ids, userId) {
  var that = this;
  return new _promise2.default(function (resolve, reject) {

    var numberOfRequest = 0;
    var numberOfMessage = ids.length;
    for (var i = 0; i < numberOfMessage; i++) {

      var id = ids[i].id;
      that.getFromHeaderFromEmailPayloadHeaders(accessToken, id, userId).then(function (email) {

        numberOfRequest++;
        that.addCompany(email);

        if (numberOfRequest == numberOfMessage) {
          var companyList = that.getCompanies();
          resolve(companyList);
        }
      }).catch(function (error) {
        reject(error);
      });
    }
  });
};

CompanyService.prototype.getFromHeaderFromEmailPayloadHeaders = function (accessToken, id, userId) {
  var options = {
    id: id,
    userId: userId,
    format: 'metadata',
    metadataHeaders: 'From',
    fields: 'id, labelIds, payload(headers)'
  };
  return gmail.GET_Message(options, accessToken);
};

CompanyService.prototype.addCompany = function () {
  throw new Error('Method: addCompany(...) is NOT implemented');
};

CompanyService.prototype.getCompanies = function () {
  throw new Error('Method: getCompanies(...) is NOT implemented');
};
//# sourceMappingURL=company.service.js.map
