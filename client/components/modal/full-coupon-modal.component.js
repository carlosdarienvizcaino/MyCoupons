/**
 * Created by NicholasSmith on 3/16/17.
 */
import angular from 'angular';

export class fullCouponModal {
  ID;
  allIDs = [];
  constructor($uibModalInstance, Coupons) {
    'ngInject';
    this.coupon = Coupons;
    this.currentModal = $uibModalInstance;
    //To eliminate "possibly unhandled rejection" error message
    this.currentModal.result.catch(function() {});
  }
  $onInit() {
    this.ID = this.coupon.getCurrentID();
    this.allIDs = this.coupon.getAllCouponsIds();
  }

  //Cancel Modal
  // cancel = function() {
  //   this.currentModal.dismiss('cancel');
  // };

  previousCoupon = function() {
    var currentID = this.allIDs.indexOf(this.ID);
    if (currentID != 0) {
      this.ID = this.allIDs[currentID-1];
    }
  };

  nextCoupon = function() {
    var currentID = this.allIDs.indexOf(this.ID);
    if (currentID != 9) {
      this.ID = this.allIDs[currentID + 1];
    }
  };
}

export default angular.module('myCouponsApp.fullCouponModal', [])
  .component('fullCouponModal', {
    template: require('./full-coupon-modal.html'),
    controller: fullCouponModal
  })
  .name;
