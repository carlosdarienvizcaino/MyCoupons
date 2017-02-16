import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  couponsId = ['couponId1'];

  /*@ngInject*/
  constructor(GoogleUser, GoogleUserResources) {
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
  }

  $onInit() {

    var that = this;
    if(this.googleUser.hasCredentials()) {
      this.googleUserResources.queryMostRecentCouponsIds(this.googleUser,5)
        .then(res => {
          this.couponsId = res.data;
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
