/**
 * Created by Carlos on 3/6/2017.
 */

var gmail = require('../../gmail/gmail-client');
var MinimalCoupon = require('./minimal-coupon.module');
var CompanyParser = require('../../companies/company-parser');

module.exports = MinimalCouponService;

function MinimalCouponService() {

  return {
    getMinimalCoupon : getMinimalCoupon,
  };
}

/**
 *
 * @param accessToke
 * @param id
 * @param userId
 * @return {Promise}
 */
function getMinimalCoupon(accessToke, id, userId) {
  return new Promise(function(resolve, reject){
    getEmailMinimalData(accessToke, id, userId)
     .then( email => {
       var minimalCoupon = createMinimalCoupon(email);
       resolve(minimalCoupon);
     })
     .catch(error => {
       var failedMinimalCoupon = createFailedMinimalCoupon(error.message);
       reject(failedMinimalCoupon);
     });
  });
}

function getEmailMinimalData(accessToken, id, userId) {
  var options = {
      id: id,
      userId: userId,
      format : 'metadata',
      metadataHeaders: ['From', 'Subject'],
      fields: 'id, snippet, internalDate, payload(headers)'
  };
  return gmail.GET_Message(options, accessToken);
}

/**
 * @param {id, snippet, internalDate, payload.headers[]} email
 * @return {MinimalCoupon}
 */
function createMinimalCoupon(email) {

  var id = email.id;
  var snippet = email.snippet;
  var date = new Date(Number.parseInt(email.internalDate)).toDateString();
  var subject = '';
  var companyNameAndEmailStr = '';

  var headers = email.payload.headers;
  for( var i in headers) {

    if (headers[i].name === 'From') {
      companyNameAndEmailStr = headers[i].value;
    }
    else if (headers[i].name === 'Subject') {
      subject = headers[i].value;
    }
  }

  var name = CompanyParser.parseCompanyName(companyNameAndEmailStr);
  var domain = CompanyParser.parseCompanyDomain(companyNameAndEmailStr);

  return new MinimalCoupon(id, name, domain, subject, snippet, date);
}

/**
 * @param {String} email
 * @return {MinimalCoupon}
 */
function createFailedMinimalCoupon(errorMessage) {
  var failedMinimalCoupon = new MinimalCoupon();
  failedMinimalCoupon.errorMessage = errorMessage;
  return failedMinimalCoupon;
}


