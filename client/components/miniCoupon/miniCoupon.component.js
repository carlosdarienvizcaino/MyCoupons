/**
 * Created by NicholasSmith on 2/18/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './miniCoupon.routes';
import {fullCouponModal} from '../modal/full-coupon-modal.component';


export class miniCouponComponent {

  // Used for one way binding
  couponId;
  miniCoupons;
  dateArray = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

  constructor(GoogleUser, GoogleUserResources, $uibModal, Coupons){
    'ngInject';
    this.modalInstance = $uibModal;
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
    this.coupon = Coupons;
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
        that.miniCoupons = response.data;
        var newDateArray = that.miniCoupons.date.split(" ");
        var monthNum = this.dateArray.indexOf(newDateArray[1]);
        var newDateFormat = monthNum + "/" + newDateArray[2] + "/" + newDateArray[3];
        that.miniCoupons.date = newDateFormat;
      })
      .catch(error =>{
        console.log(error);
      });
  }


  removeCouponAsFavorite(couponId){
    this.coupon.removeFavorite(couponId);
    this.googleUserResources.removeCouponAsFavorite(this.googleUser, couponId)
      .then(res => {
        console.log(res);
        $state.go($state.current, {}, {reload: "miniCoupon", notify: true});
        if($state.includes('favoriteCoupons'))
        $state.go($state.current, {}, {reload: "favoriteCoupons", notify: true});
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveCouponAsFavorite(couponId) {
this.coupon.addFavorites(couponId,couponId);
      this.googleUserResources.saveCouponAsFavorite(this.googleUser, couponId)
        .then(res => {
          console.log(res);
          $state.go($state.current, {}, {reload: "miniCoupon", notify: true
          });
        })
        .catch(error => {
          console.log(error);
        });


  }

  checkFavoriteCoupon(couponId){
    return this.coupon.checkforFavorites(couponId);
  }


  CouponTrash(couponId){
    var that = this;
    that.googleUserResources.trashCoupon(this.googleUser, couponId);
    that.coupon.removeNewCouponsForCompany(couponId);
    if($state.includes('favoriteCoupons'))
      this.removeCouponAsFavorite(couponId);
    else
    $state.transitionTo("main",{},{reload:"main" , notify: true
    });


  }

  couponIdIsNotUndefined(changesObj) {

    return changesObj.couponId != undefined && changesObj.couponId.currentValue != undefined;
  }

  showCoupon(couponId) {
    this.coupon.shareCurrentId(couponId);
    this.modalInstance.open({
      template: require('./../modal/full-coupon-modal.html'),
      controller: fullCouponModal,
      controllerAs: '$mCtrl',
      bindToController: true
    });
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
