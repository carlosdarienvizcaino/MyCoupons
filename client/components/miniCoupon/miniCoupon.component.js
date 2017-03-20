/**
 * Created by NicholasSmith on 2/18/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './miniCoupon.routes';
export class miniCouponComponent {

  // Used for one way binding
  couponId;
  miniCoupons = [];

  constructor(GoogleUser, GoogleUserResources){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
  }

  $onChanges(changesObj) {

    if ( this.couponIdIsNotUndefined(changesObj) ) {
      var couponId = changesObj.couponId.currentValue;
      this.queryMiniCouponWithId(this.googleUser, couponId);
    }
  }



  queryMiniCouponWithId(user, couponId) {
    var that = this;
    this.googleUserResources.queryMiniCouponWithId(user, couponId)
      .then(response => {
        that.miniCoupons.push(response.data);
      })
      .catch(error =>{
        console.log(error);
      });
  }

  CouponTrash(couponId){
    this.googleUserResources.trashCoupon(this.googleUser, couponId);
    window.location.reload();
  }

  couponIdIsNotUndefined(changesObj) {
    return changesObj.couponId != undefined && changesObj.couponId.currentValue != undefined;
  }

  showCoupon(couponId) {
    this.ChangeCouponToRead(couponId);
    console.log('here');
  }
  ChangeCouponToRead(couponId){
    this.googleUserResources.changeLabelId(this.googleUser, couponId);
  }

}

export default angular.module('myCouponsApp.miniCoupon', [uiRouter])
  .config(routing)
  .component('miniCoupon', {
    template: require('./miniCoupon.html'),
    controller: miniCouponComponent,
    bindings : {
      couponId: '<' // one way binding
    }
  })
  .name;
