/**
 * Created by Carlos on 3/2/2017.
 */


module.exports = CompanyNewCoupons;

function CompanyNewCoupons(name, domain) {
  this.name = name || "";
  this.domain = domain || "";
  this.newCouponsIds = [];
  this.newTotalCoupons = 0;
}

CompanyNewCoupons.prototype.addNewCoupon = function(couponId) {
     this.newCouponsIds.splice(this.newCouponsIds.length, 0, couponId);
     this.newTotalCoupons = this.newCouponsIds.length;
}


