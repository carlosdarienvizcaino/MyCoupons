/**
 * Created by Carlos on 3/6/2017.
 */

var CompanyService = require('./company.service');
var gmail = require('../gmail/gmail-client');
var Companies = require('./companies.module');
var CompanyNewCoupons = require('./company-new-coupons.module');
var CompanyParser = require('./company-parser');

module.exports = CompanyNewCouponsService;

function CompanyNewCouponsService () {

 CompanyService.call(this);
 this.companies = new Companies();

}

CompanyNewCouponsService.prototype = Object.create(CompanyService.prototype);
CompanyNewCouponsService.prototype.constructor = CompanyNewCoupons;

/**
 *  @param (String) id
 *  @param {String} day
 *  @param {OAuth2} oauth2Client
 *  @return {Promise} messages[{id:string},]
 */
CompanyNewCouponsService.prototype.getIdsForAllUnReadPromotionalEmailsBeforeNDays = function (accessToken, userId, day) {
  var options = {
      userId : userId,
      labelIds: ['CATEGORY_PROMOTIONS', 'UNREAD'],
      q: `newer_than:${day}d`,
      fields: 'messages(id)'
    };
  return gmail.LIST_Messages(options, accessToken);
};

/**
 * @param email { id, labelIds[], payload.headers[]}
 */
CompanyNewCouponsService.prototype.addCompany = function(email) {

  var emailOriginValue = email.payload.headers[0].value;
  var companyName = CompanyParser.parseCompanyName(emailOriginValue);

  if ( !this.companies.hasCompany(companyName) ) {

    var companyDomain = CompanyParser.parseCompanyDomain(emailOriginValue);

    var company = new CompanyNewCoupons(companyName, companyDomain);
    company.addNewCoupon(email.id);

    this.companies.addCompany(companyName, company);
  }
  else {
    var company = this.companies.getCompany(companyName);
    company.addNewCoupon(email.id);
  }

};

/**
 * @return {Companies}
 */
CompanyNewCouponsService.prototype.getCompanies = function() {
 return this.companies.getAllCompanies();
};



