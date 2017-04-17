/**
 * Created by Lazaro on 4/3/2017.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './company-coupons.routes';

export class CompanyCouponsComponent {

  numberOfCompaniesPerPage = 7;
  totalPagesNumber = 1;
  currentPageNumber = 1;

  selectedCouponsCompanyNames = [];
  selectedCouponsIds = new Map();
  days = 7;
  companies = [];

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
        that.totalPagesNumber = Math.ceil(that.companies.length/that.numberOfCompaniesPerPage);
      })
      .catch(error =>{
        console.log(error);
      });
  }

  getCompaniesPerPage(pageNumber) {

    if (this.companies.length > 0) {
      var startPosition = (pageNumber - 1) * this.numberOfCompaniesPerPage;
      var endPosition = pageNumber * this.numberOfCompaniesPerPage;
      return this.companies.slice(startPosition, endPosition);
    }
    return [];
  }

  add(newcoupons, oldcoupons){
    var sum = newcoupons + oldcoupons;
    return sum;
}

  getCompanyPages() {
    return new Array(this.totalPagesNumber);
  }

  setEachPage(pageNumber) {

    if (pageNumber >= 1 && pageNumber <= this.totalPagesNumber)
      this.currentPageNumber = pageNumber;
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
      that.couponsService.addCouponsForCompany(companyName, ids);
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
