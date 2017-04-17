/**
 * Created by Carlos on 3/2/2017.
 */

var CompanyNewCoupons = require('./company-new-coupons.module');

module.exports = CompanyAllCoupons;

function CompanyAllCoupons(name, domain) {

  // super constructor
  CompanyNewCoupons.call(this, name, domain);

  this.usedCouponsIds = [];
  this.usedTotalCoupons = 0;
}


CompanyAllCoupons.prototype = Object.create(CompanyNewCoupons.prototype);
CompanyAllCoupons.prototype.constructor = CompanyAllCoupons;

CompanyAllCoupons.prototype.addUsedCoupon = function(couponId) {
     this.usedCouponsIds.splice(this.usedCouponsIds.length, 0, couponId);
     this.usedTotalCoupons = this.usedCouponsIds.length;
};

CompanyAllCoupons.prototype.addCouponId = function(labelIds, couponId) {

     if(labelIds.includes('UNREAD')) {
       this.addNewCoupon(couponId);
       this.addUsedCoupon(couponId)
     }
     else
        this.addUsedCoupon(couponId);
};





