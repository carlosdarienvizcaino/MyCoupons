import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  coupons = [ 'coupon1', 'coupon2'];

  /*@ngInject*/
  constructor($http, GoogleUser, GoogleUserResources) {
    this.$http = $http;
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
  }

  $onInit() {

    if(this.googleUser.hasCredentials()) {
      this.googleUserResources.queryMostRecentCouponsIds(this.googleUser,5)
        .then(res => {
          this.coupons = res.data;
        })
        .catch(error => {
          console.log(error);
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
