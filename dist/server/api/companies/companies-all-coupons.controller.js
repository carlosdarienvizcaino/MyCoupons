'use strict';

/**
 * Created by Carlos on 1/20/2017.
 */

var CompanyAllCouponsService = require('./company-all-coupons.service');

module.exports = function (req, res) {

  var accessToken = req.headers.access_token;
  var userId = req.params.userId;
  var day = req.params.beforeDay;

  var companyAllCouponsService = new CompanyAllCouponsService();
  companyAllCouponsService.getIdsForAllPromotionalEmailBeforeNDay(accessToken, userId, day).then(function (email) {

    companyAllCouponsService.getCouponsPerCompany(accessToken, email.messages, userId).then(function (companiesList) {

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
//# sourceMappingURL=companies-all-coupons.controller.js.map
