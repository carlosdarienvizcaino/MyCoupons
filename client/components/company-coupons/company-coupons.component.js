/**
 * Created by Lazaro on 4/3/2017.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './company-coupons.routes';

export class CompanyCouponsComponent {

  totalPagesNumber = 1;
  currentPageNumber = 1;

  selectedCouponsCompanyNames = [];
  selectedCouponsIds = new Map();
  days = 7;

  companies = [];
  currentShowingCompanies = [];

  constructor(GoogleUser, GoogleUserResources, Coupons, $state){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
    this.couponsService = Coupons;
    this.state = $state;
  }

  $onInit() {

    if (this.googleUser.hasCredentials()) {
      this.queryCouponsPerCompanyForTheLastNDays(this.googleUser, this.days);
    }
  }

  queryCouponsPerCompanyForTheLastNDays(user, days) {
    var that = this;
    this.googleUserResources.queryCouponsPerCompanyForTheLastNDays(user, days)
      .then(response => {
        that.companies = response.data.companies;
      })
      .catch(error =>{
        console.log(error);
      });
  }

  updateCouponsForCompanies(companyName, domain, ids) {

    if (this.selectedCouponsCompanyNames.indexOf(companyName) === -1) {

      // Add
      this.selectedCouponsIds.set(companyName, ids);
      this.selectedCouponsCompanyNames.push(companyName);
    }
    else {

      // Remove
      this.selectedCouponsIds.delete(companyName);
      this.selectedCouponsCompanyNames.splice(companyName, 1);
    }
  }

  viewAllCompanyCoupons() {
    this.couponsService.removeAll();

    var that = this;
    this.selectedCouponsCompanyNames.forEach( function(companyName){
      var ids = that.selectedCouponsIds.get(companyName);
      ids.forEach(function(id){
      that.couponsService.addCouponsForCompany(id, id);
      });
    });

    $state.go('main');
  }

}

export default angular.module('myCouponsApp.companyCoupons', [uiRouter])
  .config(routing)
  .component('companyCoupons', {
    template: require('./company-coupons.html'),
    controller: CompanyCouponsComponent,
    bindings : {
      couponId: '<' // one way binding
    }
  })
  .name;
