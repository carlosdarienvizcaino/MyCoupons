
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './new-coupons.routes';

export class NewCouponsComponent {

  days = 7;
  companies;

  constructor(GoogleUser, GoogleUserResources, Coupons, $rootScope, $state){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
    this.couponsService = Coupons;
    this.rootScope = $rootScope;
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
    this.couponsService.addNewCouponsForCompany(companyName, ids);
  }

  viewAllCoupons() {
    var couponIds =  this.couponsService.getAllCouponsIds();
    this.rootScope.$emit('NewCouponsToRenderEvent', couponIds);
    $state.go('main');
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
