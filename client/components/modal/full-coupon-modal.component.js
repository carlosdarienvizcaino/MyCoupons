/**
 * Created by NicholasSmith on 3/16/17.
 */
import angular from 'angular';

export class fullCouponModal {
  currentCoupons = [];
  constructor($uibModalInstance, Coupons) {
    'ngInject';
    this.coupon = Coupons;
    this.currentModal = $uibModalInstance;
    //To eliminate "possibly unhandled rejection" error message
    this.currentModal.result.catch(function() {});
  }
  $onInit() {
    this.currentCoupons = this.coupon.getAllCouponsIds();
  }
  //Cancel Modal
  cancel = function() {
    this.currentModal.dismiss('cancel');
  }
}

export default angular.module('myCouponsApp.fullCouponModal', [])
  .component('fullCouponModal', {
    template: require('./full-coupon-modal.html'),
    controller: fullCouponModal
  })
  .name;
