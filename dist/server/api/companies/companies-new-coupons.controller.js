'use strict';

/**
 * Created by Carlos on 1/20/2017.
 */

var CompanyNewCouponsService = require('./company-new-coupons.service');

module.exports = function (req, res) {

  var accessToken = req.headers.access_token;
  var userId = req.params.userId;
  var day = req.params.beforeDay;

  var companyNewCouponsService = new CompanyNewCouponsService();
  companyNewCouponsService.getIdsForAllUnReadPromotionalEmailsBeforeNDays(accessToken, userId, day).then(function (email) {

    companyNewCouponsService.getCouponsPerCompany(accessToken, email.messages, userId).then(function (companiesList) {

      var responseBody = new ResponseBody(companiesList);
      res.status(200).send(responseBody);
    }).catch(function (error) {
      var failedResponseBody = new ResponseBody(undefined, error.message);
      res.status(400).send(failedResponseBody);
    });
  }).catch(function (error) {
    var failedResponseBody = new ResponseBody(undefined, error.message);
    res.status(400).send(failedResponseBody);
  });
};

function ResponseBody(companies, errorMessage) {
  this.companies = companies || [];
  this.errorMessage = errorMessage || '';
}
//# sourceMappingURL=companies-new-coupons.controller.js.map
