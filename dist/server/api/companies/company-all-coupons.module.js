'use strict';

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

CompanyAllCoupons.prototype = (0, _create2.default)(CompanyNewCoupons.prototype);
CompanyAllCoupons.prototype.constructor = CompanyAllCoupons;

CompanyAllCoupons.prototype.addUsedCoupon = function (couponId) {
     this.usedCouponsIds.splice(this.usedCouponsIds.length, 0, couponId);
     this.usedTotalCoupons = this.usedCouponsIds.length;
};

CompanyAllCoupons.prototype.addCouponId = function (labelIds, couponId) {

     if (labelIds.includes('UNREAD')) this.addNewCoupon(couponId);else this.addUsedCoupon(couponId);
};
//# sourceMappingURL=company-all-coupons.module.js.map
