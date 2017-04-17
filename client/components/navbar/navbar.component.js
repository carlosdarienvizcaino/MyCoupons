'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
  }];

  isCollapsed = true;

  constructor(Auth, GoogleUser, Coupons) {
    'ngInject';
    this.isGoogleLoggedIn = Auth.isGoogleLoggedIn;
    this.googleUser = GoogleUser;
    this.coupon = Coupons;
  }

  getImage(){
    return this.googleUser.getImageURL();
  }

  showName(){
    var str = this.googleUser.getFullName().split(" ");

    return str[0];
  }

  removeCoupons(){
    var that = this;
    that.coupon.removeAll();
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
