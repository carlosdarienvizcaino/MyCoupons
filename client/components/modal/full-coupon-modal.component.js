/**
 * Created by NicholasSmith on 3/16/17.
 */
import angular from 'angular';

export class fullCouponModal {

  ID;
  allIDs = [];

  constructor($uibModalInstance, Coupons, GoogleUserResources,GoogleUser) {
    'ngInject';
    this.coupon = Coupons;
    this.googleUser = GoogleUser;
    this.currentModal = $uibModalInstance;
    //To eliminate "possibly unhandled rejection" error message
    this.currentModal.result.catch(function() {});
    this.googleUserResources = GoogleUserResources;
  }

  $onInit() {
    this.ID = this.coupon.getCurrentID();
    this.allIDs = this.coupon.getAllCouponsIds();
  }

  $onChanges(objChange) {

    if(objChange.ID != undefined) {
        this.saveCouponsAsRead(this.ID);
    }
  }

  previousCoupon = function() {

    var currentID = this.allIDs.indexOf(this.ID);

    if (currentID != 0) {
      this.ID = this.allIDs[currentID-1];
    }
    else {
      this.ID = this.allIDs[this.allIDs.length-1];
    }

    this.saveCouponsAsRead(this.ID);
  };

  nextCoupon = function() {

    var currentID = this.allIDs.indexOf(this.ID);

    if (currentID != this.allIDs.length-1) {
      this.ID = this.allIDs[currentID + 1];
    }
    else {
      this.ID = this.allIDs[0];
    }
    this.saveCouponsAsRead(this.ID);
  };

  saveCouponsAsRead(couponId){
    this.googleUserResources.saveCouponAsRead(this.googleUser, couponId)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default angular.module('myCouponsApp.fullCouponModal', [])
  .component('fullCouponModal', {
    template: require('./full-coupon-modal.html'),
    controller: fullCouponModal
  })
  .name;

