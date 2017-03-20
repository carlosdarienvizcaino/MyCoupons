
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './new-coupons.routes';

export class NewCouponsComponent {

  selectedNewCoupons = [];
  days = 7;
  companies;

  constructor(GoogleUser, GoogleUserResources, Coupons, $state){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
    this.couponsService = Coupons;
    this.state = $state;
  }

  $onInit() {

    if (this.googleUser.hasCredentials()) {
      this.queryNewCouponsPerCompanyForTheLastNDays(this.googleUser, this.days);
    }
  }

  queryNewCouponsPerCompanyForTheLastNDays(user, days) {
    var that = this;
    this.googleUserResources.queryNewCouponsPerCompanyForTheLastNDays(user, days)
      .then(response => {
        that.companies = response.data.companies;
      })
      .catch(error =>{
        console.log(error);
      });
  }

  viewAllCoupons() {
    $state.go('main');
  }

  updateNewCouponsForCompany(companyName, ids) {

    if (this.selectedNewCoupons.indexOf(companyName) === -1) {
      // Add
      this.selectedNewCoupons.push(companyName);
      this.couponsService.addNewCouponsForCompany(companyName, ids);
    }
    else {
      // Remove
      this.selectedNewCoupons.splice(this.selectedNewCoupons.indexOf(companyName), 1);
      this.couponsService.removeNewCouponsForCompany(companyName);
    }
  }

}

export default angular.module('myCouponsApp.newCoupons', [uiRouter])
  .config(routing)
  .component('newCoupons', {
    template: require('./new-coupons.html'),
    controller: NewCouponsComponent,
    bindings : {
      couponId: '<' // one way binding
    }
  })
  .name;
