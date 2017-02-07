import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  coupons = [ 'coupon1', 'coupon2'];

  /*@ngInject*/
  constructor($http, GoogleUser) {
    this.$http = $http;
    this.googleUser = GoogleUser;
  }

  $onInit() {
    var that = this;
    setTimeout(function(){
      that.loadCoupons();
    }, 1000);
  }

  loadCoupons() {

    if(this.googleUser.hasCredentials()) {

      var userEmail = this.googleUser.getEmail();
      var accessToken = this.googleUser.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/ids`;
      var options = {
        headers : {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      this.$http.get(url,options)
        .then(res => {
          this.coupons = res.data;
        });
    }
  }
}

export default angular.module('myCouponsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
