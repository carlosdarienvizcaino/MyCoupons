
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './new-coupons.routes';

export class NewCouponsComponent {

  days = 7;
  companies;

  constructor(GoogleUser, GoogleUserResources){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
  }

  $onInit() {
   this.queryNewCouponsPerCompanyForTheLastNDays(this.googleUser, this.days);
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

  addNewCouponsIds(companyName, ids){
    console.log(id);
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
