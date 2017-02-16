/**
 * Created by Carlos on 2/15/2017.
 */

'use strict';

import angular from 'angular';

export class Coupon{

  mostRecentCouponHtml = [];

  // Used for one way binding
  couponId;

  constructor(GoogleUser, GoogleUserResources){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
  }

  $onChanges(changesObj) {

    if ( this.couponIdIsNotUndefined(changesObj) ) {
      var couponId = changesObj.couponId.currentValue;
      this.queryCouponWithId(this.googleUser, couponId);
    }
  }

  queryCouponWithId(user, couponId) {
    var that = this;
    this.googleUserResources.queryCouponWithId(user, couponId)
        .then(response => {
          that.mostRecentCouponHtml = this.convertCouponFromBase64UrlToHtml(response.data)
        })
        .catch(error =>{
          console.log(error);
        });
  }

  convertCouponFromBase64UrlToHtml(couponDataInBase64Url) {

    var couponInHtml = [];
    couponDataInBase64Url.data.forEach( htmlInBase64Url =>{
      var htmlInBase64 = this.Base64DecodeUrl(htmlInBase64Url);
      var html = atob(htmlInBase64);
      couponInHtml.push(html);
    });

    return couponInHtml;
  }

  Base64DecodeUrl(str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return str.replace(/-/g, '+').replace(/_/g, '/');
  }

  couponIdIsNotUndefined(changesObj) {
     return changesObj.couponId != undefined && changesObj.couponId.currentValue != undefined;
  }

}

export default angular.module('directives.coupon', [])
  .component('coupon', {
    template : require('./coupon.html'),
    controller: Coupon,
    bindings : {
     couponId: '<' // one way binding
    }
  })
  .name;
