/**
 * Created by Carlos on 3/6/2017.
 */

var CompanyService = require('./company.service');
var gmail = require('../gmail/gmail-client');
var Companies = require('./companies.module');
var CompanyAllCoupons = require('./company-all-coupons.module');
var CompanyParser = require('./company-parser');

module.exports = CompanyAllCouponsService;

function CompanyAllCouponsService () {

 CompanyService.call(this);
 this.companies = new Companies();

}

CompanyAllCouponsService.prototype = Object.create(CompanyService.prototype);
CompanyAllCouponsService.prototype.constructor = CompanyAllCouponsService;

/**
 *  @param (String) accessToken
 *  @param {String} userId
 *  @param {String} day
 *  @return {Promise} messages[{id:string},]
 */
CompanyAllCouponsService.prototype.getIdsForAllPromotionalEmailBeforeNDay = function(accessToken, userId, day) {
  var options = {
      userId : userId,
      labelIds: ['CATEGORY_PROMOTIONS'],
      q: `newer_than:${day}d`,
      fields: 'messages(id)'
    };
  return gmail.LIST_Messages(options, accessToken);
};

/**
 * @param email { id, labelIds[], payload.headers[]}
 */
CompanyAllCouponsService.prototype.addCompany = function(email) {

  var emailOriginValue = email.payload.headers[0].value;
  var companyName = CompanyParser.parseCompanyName(emailOriginValue);

  if ( !this.companies.hasCompany(companyName) ) {

    var companyDomain = CompanyParser.parseCompanyDomain(emailOriginValue);

    var company = new CompanyAllCoupons(companyName, companyDomain);
    company.addCouponId(email.labelIds, email.id);

    this.companies.addCompany(companyName, company);
  }
  else {
    var company = this.companies.getCompany(companyName);
    company.addCouponId(email.labelIds, email.id);
  }
};

/**
 * @return {Companies}
 */
CompanyAllCouponsService.prototype.getCompanies = function() {
 return this.companies.getAllCompanies();
};



